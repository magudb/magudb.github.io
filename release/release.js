const path =  require("path")
const files = process.argv[2].split("");
const blogFiles = files.filter((file)=>{
    const filename = path.basename(file, ".md")
    return filename.match(/(\d\d\d\d\-\d\d\-\d\d)/g).length > 0
})


console.log(blogFiles);

if(blogFiles.length <1){
    console.log("no need to update")
    return
}
const filename = path.basename(blogFiles[0], ".md")
const title = filename.replace(/(\d\d\d\d\-\d\d\-\d\d)/g, "")
const dateString = filename.match(/(\d\d\d\d\-\d\d\-\d\d)/g)[0];

const date = new Date(dateString);
const link = `https://udbjorg.net/${date.getFullYear()}/${date.getMonth()}/${title}`
const text = process.argv[3];

console.log("Preparing update to Mastodon", link, text)
