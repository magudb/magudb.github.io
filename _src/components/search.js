// Original JavaScript code by Chirp Internet www.chirp.com.au
// Please acknowledge use of this code by including this header.

import Fuse from "fuse.js"
import queryString from "query-string"
import Mark from "mark.js"
// @ts-ignore
require('./helper.js');

let searchTemplate = (model) => {
    return `<article class="post-item">
        <span class="post-meta date-label">${model.date}</span>
        <div class="article-title"><span class="badge-default"><a href="/categories#${model.category}">${model.category}</a></span>  <a class="post-link" href="${model.url}?searched=${model.value}">${model.title}</a></div>
      </article>`;
};

export async function For(value) {
    let response =await fetch("/search.json");
    let result = await response.json();
    let index = new Fuse(result,  {
        tokenize: true,
        threshold: 0.1,
        location: 0,
        distance: 10,
        keys: [
            "category",
            "content"
        ]
    });
    let results = index.search(value);
    if (results.length < 1) {
        return `<article class="post-item">       
        <div class="article-title">Could not find anything with <em>${value}</em></div>
      </article>`

    }
    return results.map(model => {
        model.value = value;
        return searchTemplate(model);
    }).join("\r\n");
}

let cleanResults = (container) => {
    return new Promise((resolved, rejected) => {
        Array.prototype.slice.call(document.querySelectorAll(".post-item"))
            .forEach(element => {
                console.log(element);
                element.animate("animated fadeOut")
                    .then(el => {
                        container.removeChild(el);
                    })
                    .catch(err => console.log(err))
            });
        return resolved(container);
    });

}

export async function bootstrap_dom(input_element, button_element, action) {
    let results_container = document.querySelector("#search-results");
    if (!results_container) {
        return;
    }
    let input = document.querySelector(input_element);
    let inputNav = document.querySelector("#search");
    let button = document.querySelector(button_element);
    const parsed = queryString.parse(location.search);

    if (parsed.searched) {
        var instance = new Mark(document.querySelector(".post"));
        instance.mark(parsed.searched, {
            accuracy: 'complementary',
            debug: true
        });
        return;
    }

    if (parsed.query) {
        var results = await action(parsed.query);
        input.value = parsed.query;
        inputNav.value = parsed.query;
        cleanResults(results_container)
            .then(_ => { results_container.innerHTML = results; })
            .catch(_ => console.log(_));

    }
    if (!button) {
        return;
    }

    button.addEventListener("click",async (event) => {
        event.preventDefault();
        var results =await action(input.value)
        cleanResults(results_container)
            .then(_ => { results_container.innerHTML = results; })
            .catch(_ => console.log(_));
    })

}