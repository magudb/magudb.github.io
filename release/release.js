const path =  require("path");
const Mastodon = require('mastodon-lite');

const doAnnouncement = async (files, text, token)=>{
    const config = {
        access_token: token,
        host: 'mastodon.social',
        port: 443,
        api: '/api/v1',
        rejectUnauthorized: false
      };
      const mastodon = new Mastodon(config);
  
    const blogFiles = files.filter((file)=>{
        const filename = path.basename(file, ".md")
        const match = filename.match(/(\d\d\d\d\-\d\d\-\d\d)/g);
    
        return match;
    })
    
    console.log(blogFiles);
    
    if(blogFiles.length <= 0){
        console.log("no need to update")
        return
    }
    const filename = path.basename(blogFiles[0], ".md")
    const title = filename.replace(/(\d\d\d\d\-\d\d\-\d\d)/g, "").slice(1)
    const dateString = filename.match(/(\d\d\d\d\-\d\d\-\d\d)/g)[0];
    const date = new Date(dateString);
    const link = `https://udbjorg.net/${date.getFullYear()}/${date.getMonth()}/${title.replace(/ /g, "-")}`
   
    
    console.log("Preparing update to Mastodon");
    mastodon.post(`${title}\n${text}\n${link}`, (err, status) => {
        if (err || status.error) {
          throw err ||status.error;
        } else {
          console.log(status);       
        }
      });
    return link;
}

const files = process.argv[2].split(",");
const text = process.argv[3];
const token = process.argv[4];

doAnnouncement(files, text, token)
.then((link)=>{
    console.log(`Your post is here - ${link}`)
})
.catch(error=>{
    console.error(error);
})
