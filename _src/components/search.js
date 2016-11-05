// Original JavaScript code by Chirp Internet www.chirp.com.au
// Please acknowledge use of this code by including this header.

import Fuse from "fuse.js"
import queryString from "query-string"
import Mark from "mark.js"

var searchTemplate = (model) => {
    return `<article class="post-item">
        <span class="post-meta date-label">${model.date}</span>
        <div class="article-title"><span class="badge-default">${model.category}</span>  <a class="post-link" href="${model.url}?searched=${model.value}">${model.title}</a></div>
      </article>`;
  
};

var index;
var options = {
    tokenize: true,
    threshold: 0.1,
    location: 0,
    distance: 10,
    keys: [
        "category",
        "content"
    ]
};

export function init() {
    let results_container = document.querySelector("#search-results");
    if(!results_container){
      return new Promise((resolved, rejected)=>{ 
          resolved();
      });
    }
    return fetch("/search.json")
        .then(result => result.json())
        .then(result => {
            index = new Fuse(result, options);
            return index;
        })
        .catch(err=> console.log(err));
}

export function For(value) {
    let results = index.search(value);
    if(results.length <1){
        return `<li>Could not find anything with <em>${value}</em></li>`
    }
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


    if (!button) {
       return;
    }

    button.addEventListener("click", (event) => {
        event.preventDefault();
        var results = action(input.value)
        results_container.innerHTML = results;
    })

}
