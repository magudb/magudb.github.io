import queryString from "query-string"
import Mark from "mark.js"
import moment from 'moment'
import algoliasearch from 'algoliasearch/lite';
// @ts-ignore
require('./helper.js');
const client = algoliasearch('6Y72AUE3HV', 'ee323bf7cf869c312f0f4518df252c89');

class Model {

    /**
     * @param {any} date
     * @param {any} category
     * @param {any} url
     * @param {any} title
     * @param {any} searchTerm
     */
    constructor(date, category, url, title, searchTerm) {
        this.date = moment.unix(date);
        this.category = category;
        this.url = url;
        this.title = title;
        this.searchTerm = searchTerm
    }
}

/**
 * @param{Model} model
 */
let searchTemplate = (model) => {
    return ` <div class="table"><article class="post-item">
    <div class="title article-title"><span class="badge-default"><a href="/categories#${model.category}">${model.category}</a></span>  <a class="post-link" href="${model.url}?searched=${model.searchTerm}">${model.title}</a></div>
    <div class="dots"></div>
    <span class="value post-meta date-label">${model.date.toLocaleString()}</span>
    </article>
    </div>`;
};

export function init() {
    let results_container = document.querySelector("#search-results");
    if (!results_container) {
        return;
    }
    return client.initIndex('blog');
}


export function For(value, index) {
    /**
     * @param {any} _
     */
    return  index.search(value)
    .then(({ hits }) => {
        if (hits.length < 1) {
            return `<article class="post-item">       
            <div class="article-title">Could not find anything with <em>${value}</em></div>
          </article>`
    
        }
        return  hits.map(hit => {
            let model = new Model(hit.date, hit.category, hit.url,hit.title, value);
            return searchTemplate(model);
        }).join("\r\n");
      })
      .catch(_ => console.log(_));
   
}

/**
 * @param {Element} container
 */
let cleanResults = (container) => {  
        Array.prototype.slice.call(document.querySelectorAll(".post-item"))
            .forEach(element => {                        
                element.animate("animated fadeOut")
                    .then(el => {
                        container.removeChild(el);
                    })
                    .catch(err => console.log(err))
            });
        return container;


}

/**
 * @param {string} input_element
 * @param {string} button_element
 * @param {{ (value: any, index: any): any; (arg0: any, arg1: any): Promise<any>; }} action
 * @param {any} index
 */
export function bootstrap_dom(input_element, button_element, action, index) {
    let input = document.querySelector(input_element);
    let inputNav = document.querySelector("#search");
    let button = document.querySelector(button_element);
    let results_container = document.querySelector("#search-results");
    const parsed = queryString.parse(location.search);

    if (parsed.searched) {
        let post = document.querySelector(".post");
        var instance = new Mark(post);
        instance.mark(parsed.searched, {
            accuracy: 'complementary',
            debug: true
        });
        return;
    }

    if (parsed.query) {
        input.value = parsed.query;
        inputNav.value = parsed.query;
      
        action(parsed.query, index)
        .then(results=> {
            cleanResults(results_container);
            results_container.innerHTML = results;
        })
        .catch(_ => console.log(_));
    
    }
    if (!button) {
        return;
    }

    
    button.addEventListener("click", (event) => {
        event.preventDefault();
       
        action(parsed.query, index)
        .then(results=> {
            cleanResults(results_container);
            results_container.innerHTML = results;
        })
        .catch(_ => console.log(_));
    })

}
