import Fuse from "fuse.js";
import queryString from "query-string";
import Mark from "mark.js";
import { hybridSearch, initializeVectorSearch } from "./vectorSearch.js";
// @ts-ignore
require('./helper.js');

// State for vector search
let vectorSearchEnabled = false;
let searchData = null;

// Search template matching theme styles
let searchTemplate = (model, searchValue) => {
    const highlightedTitle = highlightText(model.title, searchValue);
    const highlightedExcerpt = highlightText(model.excerpt || '', searchValue);
    
    return `<article class="post-item search-result" onclick="window.location.href='${model.url}?searched=${encodeURIComponent(searchValue)}'">
        <span class="date-label">${model.date}</span>
        <div class="article-title">
            <a class="post-link" href="${model.url}?searched=${encodeURIComponent(searchValue)}">${highlightedTitle}</a>
        </div>
        ${highlightedExcerpt ? `<div class="post-excerpt">${highlightedExcerpt}</div>` : ''}
        ${model.similarity ? `<div class="search-relevance">Relevance: ${Math.round(model.similarity * 100)}%</div>` : ''}
    </article>`;
};

// Highlight search terms in text
function highlightText(text, searchValue) {
    if (!searchValue || !text) return text;
    
    const searchTerms = searchValue.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedText;
}

// Escape special regex characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Try to load search data with embeddings
async function loadSearchData() {
    try {
        // First try to load embeddings version
        const response = await fetch("/search-with-embeddings.json");
        if (response.ok) {
            searchData = await response.json();
            // Check if embeddings exist
            if (searchData.length > 0 && searchData[0].embedding) {
                console.log('Vector search enabled with embeddings');
                return true;
            }
        }
    } catch (e) {
        console.log('No embeddings found, falling back to regular search');
    }
    
    // Fallback to regular search.json
    const response = await fetch("/search.json");
    searchData = await response.json();
    return false;
}

// Fallback Fuse.js search
const fuseSearch = (data, value) => {
    const fuse = new Fuse(data, {
        keys: [
            { name: "title", weight: 0.4 },
            { name: "excerpt", weight: 0.3 },
            { name: "body", weight: 0.2 },
            { name: "tags", weight: 0.05 },
            { name: "category", weight: 0.05 }
        ],
        includeScore: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        minMatchCharLength: 2
    });

    return fuse.search(value).map(result => ({
        ...result.item,
        similarity: 1 - result.score
    }));
};

// Main search function
const search = async (value) => {
    if (!searchData) {
        vectorSearchEnabled = await loadSearchData();
        
        // Try to initialize vector search if embeddings are available
        if (vectorSearchEnabled) {
            const initialized = await initializeVectorSearch();
            vectorSearchEnabled = initialized;
        }
    }

    let results;
    
    // Use vector search if available, otherwise fallback to Fuse.js
    if (vectorSearchEnabled) {
        try {
            results = await hybridSearch(value, searchData, {
                topK: 20,
                threshold: 0.2,
                vectorWeight: 0.8,
                keywordWeight: 0.2
            });
        } catch (error) {
            console.error('Vector search failed, falling back to keyword search:', error);
            results = fuseSearch(searchData, value);
        }
    } else {
        results = fuseSearch(searchData, value);
    }

    if (results.length < 1) {
        return {
            html: `<div class="empty-state">
                <h3>No results found</h3>
                <p>We couldn't find any posts matching "${value}"</p>
                <div class="search-suggestions">
                    <h4>Search tips:</h4>
                    <ul>
                        <li>Try different keywords</li>
                        <li>Use related terms</li>
                        <li>Check your spelling</li>
                    </ul>
                </div>
            </div>`,
            count: 0
        };
    }

    // Sort by relevance score (similarity or finalScore)
    const sortedResults = results
        .sort((a, b) => {
            const scoreA = a.finalScore || a.similarity || 0;
            const scoreB = b.finalScore || b.similarity || 0;
            return scoreB - scoreA;
        })
        .slice(0, 20);

    const html = sortedResults
        .map(result => searchTemplate(result, value))
        .join("");

    return {
        html,
        count: sortedResults.length,
        vectorSearch: vectorSearchEnabled
    };
};

export async function For(value) {
    return await search(value);
}

export async function bootstrap_dom(input_element, button_element) {
    const results_container = document.querySelector("#search-results");
    const search_info = document.querySelector("#search-info");
    
    if (!results_container) {
        return;
    }

    const input = document.querySelector(input_element);
    const parsed = queryString.parse(location.search);

    // Preload search data
    loadSearchData().then(hasEmbeddings => {
        vectorSearchEnabled = hasEmbeddings;
        if (hasEmbeddings && search_info) {
            search_info.innerHTML = '<span style="color: #0066cc; font-size: 0.75rem;">✨ AI-powered search enabled</span>';
        }
    });

    // Handle highlighting on post pages
    if (parsed.searched) {
        const postElement = document.querySelector(".post");
        if (postElement) {
            const instance = new Mark(postElement);
            instance.mark(parsed.searched, {
                accuracy: 'complementary',
                className: 'search-highlight',
                exclude: ['script', 'style', 'pre', 'code'],
                separateWordSearch: true
            });
        }
        return;
    }

    // Handle search from URL parameters
    if (parsed.query) {
        const results = await search(parsed.query);
        if (input) input.value = parsed.query;
        
        results_container.innerHTML = results.html;
        
        if (search_info && results.count > 0) {
            const searchType = results.vectorSearch ? 'AI-powered' : 'keyword';
            search_info.innerHTML = `<span>${results.count} ${results.count === 1 ? 'result' : 'results'} found</span> <span style="color: #0066cc; font-size: 0.75rem;">(${searchType} search)</span>`;
        }
    }

    // Search functionality
    const performSearch = async () => {
        const query = input.value.trim();
        
        if (!query) {
            results_container.innerHTML = '<div class="initial-state">Start typing to search</div>';
            if (search_info) search_info.innerHTML = vectorSearchEnabled ? 
                '<span style="color: #0066cc; font-size: 0.75rem;">✨ AI-powered search enabled</span>' : '';
            window.history.pushState({}, '', window.location.pathname);
            return;
        }

        // Show loading state
        results_container.innerHTML = '<div class="search-loading">Searching...</div>';
        if (search_info) search_info.textContent = '';
        
        try {
            const results = await search(query);
            results_container.innerHTML = results.html;
            
            if (search_info && results.count > 0) {
                const searchType = results.vectorSearch ? 'AI-powered' : 'keyword';
                search_info.innerHTML = `<span>${results.count} ${results.count === 1 ? 'result' : 'results'} found</span> <span style="color: #0066cc; font-size: 0.75rem;">(${searchType} search)</span>`;
            }
            
            // Update URL
            window.history.pushState({}, '', `${window.location.pathname}?query=${encodeURIComponent(query)}`);
        } catch (error) {
            console.error('Search error:', error);
            results_container.innerHTML = '<p class="search-error">Search failed. Please try again.</p>';
        }
    };

    // Add event listeners
    if (input) {
        // Enter key support
        input.addEventListener("keypress", async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                await performSearch();
            }
        });

        // Live search with debouncing
        let searchTimeout;
        input.addEventListener("input", (event) => {
            clearTimeout(searchTimeout);
            const query = event.target.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(async () => {
                    await performSearch();
                }, 300);
            } else if (query.length === 0) {
                results_container.innerHTML = '<div class="initial-state">Start typing to search</div>';
                if (search_info) search_info.innerHTML = vectorSearchEnabled ? 
                    '<span style="color: #0066cc; font-size: 0.75rem;">✨ AI-powered search enabled</span>' : '';
                window.history.pushState({}, '', window.location.pathname);
            }
        });
    }
}

// Add minimal styles for relevance score
const style = document.createElement('style');
style.textContent = `
.search-relevance {
    font-size: 0.75rem;
    color: #0066cc;
    margin-top: 0.25rem;
    opacity: 0.7;
}
`;
document.head.appendChild(style);