import queryString from "query-string";
import Mark from "mark.js";

// DocFind search module - loaded dynamically
let docfindSearch = null;
let searchReady = false;

// Search template - Drudge-style dense table rows
let searchTemplate = (model, searchValue) => {
    const highlightedTitle = highlightText(escapeHtml(model.title), searchValue);
    const url = sanitizeUrl(model.href);
    const date = escapeHtml(model.date || '');

    // Skip results with invalid URLs
    if (!url) return '';

    return `<div class="table">
        <article class="row">
            <div class="title article-title">
                <a class="post-link" href="${url}?searched=${encodeURIComponent(searchValue)}">${highlightedTitle}</a>
            </div>
            <div class="dots"></div>
            <div class="value date-label">${date}</div>
        </article>
    </div>`;
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

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Sanitize URL to prevent javascript: and data: protocol attacks
function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    // Allow relative URLs (starting with /) and http(s) URLs only
    if (trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }
    // Block potentially dangerous protocols
    return '';
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
            html: `<p class="search-message">Search loading...</p>`,
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
            html: `<p class="search-message">Search error. Please try again.</p>`,
            count: 0
        };
    }

    if (!results || results.length < 1) {
        return {
            html: `<p class="search-message">No results for "${escapeHtml(value)}"</p>`,
            count: 0
        };
    }

    // Take top 30 results for dense display
    const topResults = results.slice(0, 30);

    const html = topResults
        .map(result => searchTemplate(result, value))
        .join("");

    return {
        html,
        count: topResults.length
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
            search_info.textContent = `${results.count} results`;
        }
    }

    // Search functionality
    const performSearch = async () => {
        const query = input.value.trim();

        if (!query) {
            results_container.innerHTML = '<p class="search-message">Type to search</p>';
            if (search_info) search_info.textContent = '';
            window.history.pushState({}, '', window.location.pathname);
            return;
        }

        // Show loading state
        results_container.innerHTML = '<p class="search-message">Searching...</p>';
        if (search_info) search_info.textContent = '';

        try {
            const results = await search(query);
            results_container.innerHTML = results.html;

            if (search_info) {
                search_info.textContent = results.count > 0 ? `${results.count} results` : '';
            }

            // Update URL
            window.history.pushState({}, '', `${window.location.pathname}?query=${encodeURIComponent(query)}`);
        } catch (error) {
            console.error('Search error:', error);
            results_container.innerHTML = '<p class="search-message">Search failed</p>';
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
                results_container.innerHTML = '<p class="search-message">Type to search</p>';
                if (search_info) search_info.textContent = '';
                window.history.pushState({}, '', window.location.pathname);
            }
        });
    }
}
