const path = require("path");
const Mastodon = require('mastodon-lite');

// Slugify to match Jekyll's URL generation (same as generate-docfind.js)
function slugify(text) {
    return text
        .replace(/:/g, '')              // Remove colons
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/-+/g, '-')            // Collapse multiple hyphens
        .replace(/^-|-$/g, '');         // Trim hyphens from ends
}

const doAnnouncement = async (files, text, token) => {
    const config = {
        access_token: token,
        host: 'mastodon.social',
        port: 443,
        api: '/api/v1',
        rejectUnauthorized: true  // Require valid TLS certificates
    };
    const mastodon = new Mastodon(config);

    // Filter for blog post files (format: YYYY-MM-DD-title.md)
    const blogFiles = files.filter((file) => {
        const filename = path.basename(file, ".md");
        return /^\d{4}-\d{2}-\d{2}-.+/.test(filename);
    });

    console.log('New blog posts found:', blogFiles);

    if (blogFiles.length <= 0) {
        console.log("No new blog posts to announce");
        return null;
    }

    // Process the first (newest) blog post
    const filename = path.basename(blogFiles[0], ".md");
    const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);

    if (!match) {
        console.log("Could not parse filename:", filename);
        return null;
    }

    const [, year, month, , titlePart] = match;
    const title = titlePart.replace(/-/g, ' ');  // Convert hyphens back to spaces for display
    const slug = slugify(titlePart);
    const link = `https://udbjorg.net/${year}/${month}/${slug}`
   
    
    console.log("Preparing update to Mastodon");
    console.log(`Title: ${title}`);
    console.log(`Link: ${link}`);

    return new Promise((resolve, reject) => {
        const message = text ? `${title}\n\n${text}\n\n${link}` : `New blog post: ${title}\n\n${link}`;
        mastodon.post(message, (err, status) => {
            if (err || status?.error) {
                reject(err || status.error);
            } else {
                console.log('Posted successfully:', status);
                resolve(link);
            }
        });
    });
};

// CLI usage: node release.js "file1.md,file2.md" "optional message" "mastodon_token"
const files = process.argv[2] ? process.argv[2].split(",") : [];
const text = process.argv[3] || '';
const token = process.argv[4];

if (!token) {
    console.error("Error: Mastodon token is required");
    process.exit(1);
}

if (files.length === 0) {
    console.log("No files provided, nothing to announce");
    process.exit(0);
}

doAnnouncement(files, text, token)
    .then((link) => {
        if (link) {
            console.log(`✓ Announced: ${link}`);
        } else {
            console.log("No announcement made");
        }
    })
    .catch(error => {
        console.error("Announcement failed:", error);
        process.exit(1);
    });
