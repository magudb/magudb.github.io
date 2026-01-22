import queryString from "query-string";
import Mark from "mark.js";
require('./helper.js');

// DocFind search module - loaded dynamically
let docfindSearch = null;
let searchReady = false;

// Search template matching theme styles
let searchTemplate = (model, searchValue) => {
    const highlightedTitle = highlightText(model.title, searchValue);
    const highlightedExcerpt = highlightText(model.excerpt || '', searchValue);
    const url = model.href || '';
    const date = model.date || '';
    const score = model.score != null ? Math.round(model.score * 100) : null;

    return `<article class="post-item search-result" onclick="window.location.href='${url}?searched=${encodeURIComponent(searchValue)}'">
        <span class="date-label">${date}</span>
        <div class="article-title">
            <a class="post-link" href="${url}?searched=${encodeURIComponent(searchValue)}">${highlightedTitle}</a>
        </div>
        ${highlightedExcerpt ? `<div class="post-excerpt">${highlightedExcerpt}</div>` : ''}
        ${score != null ? `<div class="search-relevance">Relevance: ${score}%</div>` : ''}
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

// Initialize DocFind
async function initDocFind() {
    if (docfindSearch) return true;

    try {
        // Dynamic import of DocFind module (webpackIgnore prevents bundling)
        const docfind = await import(/* webpackIgnore: true */ '/assets/js/docfind/docfind.js');
        docfindSearch = docfind.default || docfind.search || docfind;
        searchReady = true;
        console.log('DocFind search initialized');
        return true;
    } catch (error) {
        console.error('Failed to load DocFind:', error);
        return false;
    }
}

// Main search function
const search = async (value) => {
    if (!searchReady) {
        await initDocFind();
    }

    if (!docfindSearch) {
        return {
            html: `<div class="empty-state">
                <h3>Search unavailable</h3>
                <p>Search is currently loading. Please try again in a moment.</p>
            </div>`,
            count: 0
        };
    }

    let results;

    try {
        // DocFind returns results with score and document data
        results = await docfindSearch(value);
    } catch (error) {
        console.error('DocFind search failed:', error);
        return {
            html: `<div class="empty-state">
                <h3>Search error</h3>
                <p>An error occurred while searching. Please try again.</p>
            </div>`,
            count: 0
        };
    }

    if (!results || results.length < 1) {
        return {
            html: `<div class="empty-state">
                <h3>No results found</h3>
                <p>We couldn't find any posts matching "${value}"</p>
                <div class="search-suggestions">
                    <h4>Search tips:</h4>
                    <ul>
                        <li>Try different keywords</li>
                        <li>Use fewer or more general terms</li>
                        <li>Check your spelling</li>
                    </ul>
                </div>
            </div>`,
            count: 0
        };
    }

    // Take top 20 results
    const topResults = results.slice(0, 20);

    const html = topResults
        .map(result => searchTemplate(result, value))
        .join("");

    return {
        html,
        count: topResults.length,
        docfindSearch: true
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

    // Preload DocFind
    initDocFind().then(ready => {
        searchReady = ready;
        if (ready && search_info) {
            search_info.innerHTML = '<span style="color: #0066cc; font-size: 0.75rem;">🔍 Fast fuzzy search enabled</span>';
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
            search_info.innerHTML = `<span>${results.count} ${results.count === 1 ? 'result' : 'results'} found</span> <span style="color: #0066cc; font-size: 0.75rem;">(fuzzy search)</span>`;
        }
    }

    // Search functionality
    const performSearch = async () => {
        const query = input.value.trim();

        if (!query) {
            results_container.innerHTML = '<div class="initial-state">Start typing to search</div>';
            if (search_info) search_info.innerHTML = searchReady ?
                '<span style="color: #0066cc; font-size: 0.75rem;">🔍 Fast fuzzy search enabled</span>' : '';
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
                search_info.innerHTML = `<span>${results.count} ${results.count === 1 ? 'result' : 'results'} found</span> <span style="color: #0066cc; font-size: 0.75rem;">(fuzzy search)</span>`;
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
                if (search_info) search_info.innerHTML = searchReady ?
                    '<span style="color: #0066cc; font-size: 0.75rem;">🔍 Fast fuzzy search enabled</span>' : '';
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
