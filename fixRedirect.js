const fs = require("fs");
const path = require('path');
const util = require('util')
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)
//joining path of directory 
const directoryPath = path.join(__dirname, '_posts');
(async () => {
    const files = await readdir(directoryPath);
    const mdFiles = await Promise.all(files
    .filter(file=> file.endsWith(".md"))
    .map(async (file)=>{
        const content = await readFile(`_posts/${file}`, 'utf8');
        let contentAsArray = content.split("\n");
        const hasRedirect = contentAsArray[7].startsWith("redirect_from:");
        if(!hasRedirect){
         const redirect = `redirect_from: "/${file.substring(0,4)}/${file.substring(11, file.length-3).replace(/ /g, "-")}/"`;
          contentAsArray.splice(7,0, redirect);
        }
        return {
            file,
            content: contentAsArray,
                  
        }
    }));
    console.log("DOOOOING IT");
    await Promise.all(mdFiles.map(async f => {
        const content = f.content.join("\n");
        await writeFile(f.file, content);
        console.log(`Writing redirect to ${f.file}`);
    }));
})()