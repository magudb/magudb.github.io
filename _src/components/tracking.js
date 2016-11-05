
let isRelativeUrl = (url) => {
    var regex = /^https?:\/\//i;
    return !regex.test(url) || url.toLowerCase().indexOf("udbjorg.net")>-1
};

export function for_google() {
    var elements =  Array.prototype.slice.call(document.querySelectorAll("a"));
    elements.forEach(element => {
        element.addEventListener("click", function (event) {
            var isRelative = isRelativeUrl(event.target.href)
            var url = event.target.getAttribute("href")         
            if(isRelativeUrl(url)){
                return;
            }
            event.preventDefault();
            ga('send', 'event', {
                eventCategory: 'Outbound Link',
                eventAction: 'click',
                eventLabel: event.target.href
            });

            return window.open(event.target.href, "_blank");
        });
    });
}

