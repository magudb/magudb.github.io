// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

import Fuse from "fuse.js"
import queryString from "query-string"
import Mark from "mark.js"

var searchTemplate = (model) => {
    return `<li><a href="${model.url}?searched=${model.value}">${model.title}</a></li>`;
};

var index;
var options = {
    tokenize: true,
    threshold: 0.1,
    location: 0,
    distance: 10,
    keys: [
        "title",
        "content"
    ]
};

export function init() {
    var inputs = Array.prototype.slice.call(document.querySelectorAll("search"))
    inputs.forEach(inputs => {
        inputs.setAttribute('disabled', 'disabled')
    });
    return fetch("/search.json")
        .then(result => result.json())
        .then(result => {
            var inputs = Array.prototype.slice.call(document.querySelectorAll("search"))
            inputs.forEach(inputs => {
                inputs.setAttribute('disabled', 'false')
            });

            index = new Fuse(result, options);
            return index;
        })
}

export function For(value) {
    let results = index.search(value);
    return results.map(model => {
        model.value = value;
        return searchTemplate(model);
    }).join("\r\n");
}

export function bootstrap_dom(input_element, button_element, action) {
    let input = document.querySelector(input_element);
    let inputNav = document.querySelector("#search");
    let button = document.querySelector(button_element);
    let results_container = document.querySelector("#search-results");
    const parsed = queryString.parse(location.search);
    if (results_container) {
        while (results_container.firstChild) {
            results_container.removeChild(results_container.firstChild);
        }
    }

    if (parsed.query) {
        var results = action(parsed.query);
        input.value = parsed.query;
        inputNav.value = parsed.query;
        results_container.innerHTML = results;
        return;
    }

    if (parsed.searched) {
        console.log("highlighting", parsed.searched)
        var instance = new Mark(document.querySelector(".post"));
        instance.mark(parsed.searched, {
            accuracy: 'complementary',
            debug: true
        });
        return;
    }


    // if (!button) {
    //     var form = document.querySelector('#search');
    //     return form.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         location.href = `/search?query=${inputNav.value}`
    //     }, false);
    // }

    button.addEventListener("click", (event) => {
        event.preventDefault();
        var results = action(input.value)
        results_container.innerHTML = results;
    })

}
