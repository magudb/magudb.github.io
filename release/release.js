const files = process.argv[2].split("");
const blogFiles = files.filter((file)=>{
    return file.split("-").length === 3
})
const text = process.argv[3]

console.log(blogFiles, text);

if(blogFiles.length <1){
    console.log("no need to update")
    return
}

console.log("Preparing update to Mastodon")
