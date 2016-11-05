// Original JavaScript code by Chirp Internet www.chirp.com.au
// Please acknowledge use of this code by including this header.

import Fuse from "fuse.js"
import queryString from "query-string"
import Mark from "mark.js"

let searchTemplate = (model) => {
    return `<article class="post-item">
        <span class="post-meta date-label">${model.date}</span>
        <div class="article-title"><span class="badge-default"><a href="/categories#${model.category}">${model.category}</a></span>  <a class="post-link" href="${model.url}?searched=${model.value}">${model.title}</a></div>
      </article>`;
};

let hasClass = function (el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    } else {
        return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
    }
}

let addClass = function (el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += " " + className;
    }
    return el;
}

let removeClass = function (el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    return el;
}

NodeList.prototype.toArray = function () {
    return Array.prototype.slice.call(this);
}

Element.prototype.addClass = function (className) {
    return addClass(this, className);
}

Element.prototype.removeClass = function (className) {
    return removeClass(this, className);
}

Element.prototype.hasClass = function (className) {
    return hasClass(this, className);
}

NodeList.prototype.addClass = function (className) {
    this.toArray().map(el => el.addClass(className));
    return this;
}

NodeList.prototype.removeClass = function (className) {
    this.toArray().map(el => el.removeClass(className));
    return this;

}

NodeList.prototype.hasClass = function (className) {
    return hasClass(this, className);
}

Node.prototype.addClass = function (className) {
    return addClass(this, className);
}

Node.prototype.removeClass = function (className) {
    return removeClass(this, className);
}

Node.prototype.hasClass = function (className) {
    return hasClass(this, className);
}

Element.prototype.toggleClass = function (className) {
    if (hasClass(this, className)) {
        removeClass(this, className);
    } else {
        addClass(this, className);
    }
    return this;
}
Node.prototype.toggleClass = function (className) {
    if (hasClass(this, className)) {
        removeClass(this, className);
    } else {
        addClass(this, className);
    }
    return this;
}
NodeList.prototype.toggleClass = function (className) {
    this.toArray().map(el => el.toggleClass(className));
    return this;
}

NodeList.prototype.blur = function () {
    this.toArray().map(el => {
        el.style.display = 'none';
        el.blur();
    });
    return this;
}

Element.prototype.show = function () {
    this.style.display = 'block';
    return this;
}

Node.prototype.show = function () {
    this.style.display = 'block';
    return this;
}

NodeList.prototype.show = function () {
    this.toArray().map(el => {
        el.style.display = 'block';

    });
    return this;
}

Element.prototype.hide = function () {
    this.style.display = 'none';
    return this;
}

Node.prototype.hide = function () {
    this.style.display = 'none';
    return this;
}

NodeList.prototype.hide = function () {
    this.toArray().map(el => {
        el.style.display = 'none';

    });
    return this;
}
Element.prototype.eq = function (index) {
    if (index >= 0 && index < this.length)
        return this[index];
    else
        return -1;
}

Node.prototype.eq = function (index) {
    if (index >= 0 && index < this.length)
        return this[index];
    else
        return -1;
}

NodeList.prototype.eq = function (index) {
    if (index >= 0 && index < this.length)
        return this[index];
    else
        return -1;
}

let whichTransitionEvent = () => {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

Element.prototype.animate = function (className) {
    var self = this;
    return new Promise(function (resolve, reject) {
        try {
            var eventName = whichTransitionEvent();
            self.addClass(className);
            self.addEventListener(eventName, function () {
                resolve(self);
            }, false);

        } catch (e) {
            return reject(e);
        }
    });
}

Node.prototype.animate = function (className) {
    var self = this;
    return new Promise(function (resolve, reject) {
         try {
            var eventName = whichTransitionEvent();
            self.addClass(className);
            self.addEventListener(eventName, function () {
                return resolve(self);
            }, false);

        } catch (e) {
            return reject(e);
        }
    });
}

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
    if (!results_container) {
        return new Promise((resolved, rejected) => {
            resolved();
        });
    }
    return fetch("/search.json")
        .then(result => result.json())
        .then(result => {
            index = new Fuse(result, options);
            return index;
        })
        .catch(err => console.log(err));
}

export function For(value) {
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

export function bootstrap_dom(input_element, button_element, action) {
    let input = document.querySelector(input_element);
    let inputNav = document.querySelector("#search");
    let button = document.querySelector(button_element);
    let results_container = document.querySelector("#search-results");
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
        var results = action(parsed.query);
        input.value = parsed.query;
        inputNav.value = parsed.query;
        cleanResults(results_container)
            .then(_ => { results_container.innerHTML = results; })
            .catch(_ => console.log(_));

    }
    if (!button) {
        return;
    }

    button.addEventListener("click", (event) => {
        event.preventDefault();
        var results = action(input.value)
        cleanResults(results_container)
            .then(_ => { results_container.innerHTML = results; })
            .catch(_ => console.log(_));
    })

}
