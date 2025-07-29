const fs = require('fs').promises;
const path = require('path');
const { pipeline } = require('@huggingface/transformers');
// Initialize the embedding pipeline
let pipelineSingleton = null;
async function getPipeline() {
    if (!pipelineSingleton) {
        pipelineSingleton = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
            quantized: true
        });
    }
    return pipelineSingleton;
}

// Generate embedding from text
async function generateEmbedding(text) {
    const pipe = await getPipeline();
    const output = await pipe(text, {
        pooling: 'mean',
        normalize: true
    });
    return Array.from(output.data);
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
                const category = frontMatter.match(/category:\s*["']?(.+?)["']?\s*$/m)?.[1] || 'uncategorized';
                const tags = frontMatter.match(/tags:\s*\[(.+?)\]/)?.[1]?.split(',').map(t => t.trim().replace(/["']/g, '')) || [];
                const date = frontMatter.match(/date:\s*["']?(.+?)["']?\s*$/m)?.[1] || '';
                
                // Extract excerpt
                const excerpt = bodyContent.split('\n\n')[0].replace(/[#*_`]/g, '').substring(0, 300);
                
                // Create URL from filename
                const dateMatch = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
                const url = dateMatch ? 
                    `/${dateMatch[1]}/${dateMatch[2]}/${dateMatch[4].replace(/\s+/g, '-')}` : 
                    `/${file.replace('.md', '')}`;
                
                posts.push({
                    title,
                    category,
                    tags,
                    url,
                    date,
                    excerpt,
                    body: bodyContent,
                    content: `${title} ${excerpt} ${bodyContent}` // Combined content for embedding
                });
            }
        }
    }
    
    return posts;
}

// Generate embeddings for all posts
async function generatePostEmbeddings() {
    console.log('Loading posts...');
    const posts = await getAllPosts();
    console.log(`Found ${posts.length} posts`);
    
    console.log('Initializing embedding model...');
    await getPipeline();
    
    console.log('Generating embeddings...');
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        console.log(`Processing ${i + 1}/${posts.length}: ${post.title}`);
        
        try {
            const embedding = await generateEmbedding(post.content);
            post.embedding = embedding;
        } catch (error) {
            console.error(`Error generating embedding for ${post.title}:`, error);
            post.embedding = null;
        }
    }
    
    // Create search data with embeddings
    const searchData = posts.map(post => ({
        title: post.title,
        category: post.category,
        tags: post.tags,
        url: post.url,
        date: post.date,
        timestamp: new Date(post.date).getTime() / 1000,
        excerpt: post.excerpt,
        body: post.body,
        embedding: post.embedding
    }));
    
    // Write to search.json
    const outputPath = path.join(__dirname, '..', 'search-with-embeddings.json');
    await fs.writeFile(
        outputPath, 
        JSON.stringify(searchData, null, 2),
        'utf-8'
    );
    
    console.log(`\nEmbeddings generated and saved to ${outputPath}`);
    console.log(`File size: ${(await fs.stat(outputPath)).size / 1024 / 1024} MB`);
}

// Run the script
generatePostEmbeddings().catch(console.error);
