const fs = require('fs').promises;
const path = require('path');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

// Convert markdown to plain text
function markdownToPlainText(markdown) {
    const html = md.render(markdown);

    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        .replace(/\s+/g, ' ')
        .trim();
}

// Read all markdown files from _posts directory
async function getAllPosts() {
    const postsDir = path.join(__dirname, '..', '_posts');
    const files = await fs.readdir(postsDir);
    const posts = [];

    for (const file of files) {
        if (file.endsWith('.md')) {
            const filePath = path.join(postsDir, file);
            const content = await fs.readFile(filePath, 'utf-8');

            // Parse front matter
            const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
            if (frontMatterMatch) {
                const frontMatter = frontMatterMatch[1];
                const bodyContent = content.slice(frontMatterMatch[0].length).trim();

                // Extract metadata
                const title = frontMatter.match(/title:\s*["']?(.+?)["']?\s*$/m)?.[1] || file;
                const category = frontMatter.match(/category:\s*["']?(.+?)["']?\s*$/m)?.[1] || 'Blog';

                // Extract date from filename
                const dateMatch = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
                const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : '';

                // Create URL from filename
                const href = dateMatch ?
                    `/${dateMatch[1]}/${dateMatch[2]}/${dateMatch[4].replace(/\s+/g, '-')}` :
                    `/${file.replace('.md', '')}`;

                // Convert body to plain text
                const plainTextBody = markdownToPlainText(bodyContent);

                // DocFind required format: title, category, href, body
                posts.push({
                    title: title,
                    category: category,
                    href: href,
                    body: plainTextBody,
                    // Extra fields for search result display (DocFind passes these through)
                    date: date,
                    excerpt: plainTextBody.substring(0, 300)
                });
            }
        }
    }

    // Sort by date descending
    posts.sort((a, b) => b.date.localeCompare(a.date));

    return posts;
}

// Generate DocFind documents.json
async function generateDocFindIndex() {
    console.log('Loading posts...');
    const posts = await getAllPosts();
    console.log(`Found ${posts.length} posts`);

    // Write to docfind-documents.json
    const outputPath = path.join(__dirname, '..', 'docfind-documents.json');
    await fs.writeFile(
        outputPath,
        JSON.stringify(posts, null, 2),
        'utf-8'
    );

    const stats = await fs.stat(outputPath);
    console.log(`\nDocFind documents generated: ${outputPath}`);
    console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`Documents: ${posts.length}`);
}

// Run the script
generateDocFindIndex().catch(console.error);
