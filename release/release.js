const { match } = require("assert");
const path =  require("path")
const file = process.argv[2];
const blogFileMatch = file.match(/(\d\d\d\d\-\d\d\-\d\d)/g);

console.log(blogFileMatch);

if(!blogFileMatch && path.extname(file) !== '.md'){
    console.log("Not a blog post, won't annouce to the world...")
    return
}

const filename = path.basename(file, ".md")
const title = filename.replace(/(\d\d\d\d\-\d\d\-\d\d)/g, "")
const dateString = blogFileMatch[0];

const date = new Date(dateString);
const link = `https://udbjorg.net/${date.getFullYear()}/${date.getMonth()}/${title}`
const text = process.argv[3];

console.log("Preparing update to Mastodon", link, text)
