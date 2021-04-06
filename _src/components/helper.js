
let hasClass = /**
* @param {HTMLElement} el
* @param {string} className
*/
function (el, className) {
   if (el.classList) {
       return el.classList.contains(className);
   } else {
       return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
   }
}

let addClass = /**
* @param {HTMLElement} el
* @param {string} className
*/
function (el, className) {
   if (el.classList) {
      className.split(" ").forEach(name => {el.classList.add(name);});       
   } else {
       el.className += " " + className;
   }
   return el;
}

let removeClass = /**
* @param {HTMLElement} el
* @param {string} className
*/
function (el, className) {
   if (el.classList) {
      className.split(" ").forEach(name => {el.classList.remove(name);});     
   } else {
       el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
   }
   return el;
}

NodeList.prototype.toArray = function () {
   return Array.prototype.slice.call(this);
}

Element.prototype.addClass = 
function (className) {
   return addClass(this, className);
}

Element.prototype.removeClass = 
function (className) {
   return removeClass(this, className);
}

Element.prototype.hasClass =
function (className) {
   return hasClass(this, className);
}

NodeList.prototype.addClass = 
function (className) {    
   this.toArray().map(el => el.addClass(className));
   return this;
}

NodeList.prototype.removeClass =
function (className) {   
   this.toArray().map(el => el.removeClass(className));
   return this;

}

NodeList.prototype.hasClass = 
function (className) {
   return hasClass(this, className);
}

Node.prototype.addClass = 
function (className) {
   return addClass(this, className);
}

Node.prototype.removeClass = 
function (className) {
   return removeClass(this, className);
}

Node.prototype.hasClass =
function (className) {
   return hasClass(this, className);
}

Element.prototype.toggleClass =
function (className) {
   if (hasClass(this, className)) {
       removeClass(this, className);
   } else {
       addClass(this, className);
   }
   return this;
}
Node.prototype.toggleClass =
function (className) {
   if (hasClass(this, className)) {
       removeClass(this, className);
   } else {
       addClass(this, className);
   }
   return this;
}
NodeList.prototype.toggleClass = 
function (className) {  
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
   /**
    * @param {{ style: { display: string; }; }} el
    */
   this.toArray().map(el => {
       el.style.display = 'none';

   });
   return this;
}
Element.prototype.eq = /**
* @param {number} index
*/
function (index) {
   if (index >= 0 && index < this.length)
       return this[index];
   else
       return -1;
}

Node.prototype.eq = /**
* @param {number} index
*/
function (index) {
   if (index >= 0 && index < this.length)
       return this[index];
   else
       return -1;
}

NodeList.prototype.eq = /**
* @param {number} index
*/
function (index) {
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
           self.addClass(`${className}`);
           self.addEventListener(eventName, function () {
               resolve(self);
           }, false);

       } catch (e) {
           return reject(e);
       }
   });
}

Node.prototype.animate = /**
* @param {any} className
*/
function (className) {
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
