import { pipeline, env } from '@huggingface/transformers';

// Configure transformers to use local models
env.allowLocalModels = false;
env.useBrowserCache = true;

// Singleton pattern for the pipeline
let pipelineSingleton = null;

// Initialize the embedding pipeline
async function getPipeline() {
    if (!pipelineSingleton) {
        // Use a smaller, faster model for better browser performance
        pipelineSingleton = pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
            quantized: true // Use quantized model for smaller size
        });
    }
    return pipelineSingleton;
}

// Generate embedding from text
export async function generateEmbedding(text) {
    const pipe = await getPipeline();
    const output = await pipe(text, {
        pooling: 'mean',
        normalize: true
    });
    return Array.from(output.data);
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Vector search implementation
export async function vectorSearch(query, documents, options = {}) {
    const {
        topK = 20,
        threshold = 0.3
    } = options;

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    
    // Calculate similarities for all documents
    const results = documents.map(doc => {
        const similarity = doc.embedding ? 
            cosineSimilarity(queryEmbedding, doc.embedding) : 0;
        
        return {
            ...doc,
            similarity
        };
    });
    
    // Filter by threshold and sort by similarity
    return results
        .filter(doc => doc.similarity >= threshold)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
}

// Hybrid search combining vector and keyword search
export async function hybridSearch(query, documents, options = {}) {
    const {
        vectorWeight = 0.7,
        keywordWeight = 0.3,
        ...vectorOptions
    } = options;
    
    // Perform vector search
    const vectorResults = await vectorSearch(query, documents, vectorOptions);
    
    // Simple keyword matching for hybrid approach
    const queryTerms = query.toLowerCase().split(/\s+/);
    const keywordResults = documents.map(doc => {
        const text = `${doc.title} ${doc.excerpt} ${doc.body}`.toLowerCase();
        const matchCount = queryTerms.filter(term => text.includes(term)).length;
        const keywordScore = matchCount / queryTerms.length;
        
        return {
            ...doc,
            keywordScore
        };
    });
    
    // Combine scores
    const combinedResults = new Map();
    
    vectorResults.forEach(doc => {
        combinedResults.set(doc.url, {
            ...doc,
            finalScore: doc.similarity * vectorWeight
        });
    });
    
    keywordResults.forEach(doc => {
        if (doc.keywordScore > 0) {
            const existing = combinedResults.get(doc.url);
            if (existing) {
                existing.finalScore += doc.keywordScore * keywordWeight;
            } else {
                combinedResults.set(doc.url, {
                    ...doc,
                    similarity: 0,
                    finalScore: doc.keywordScore * keywordWeight
                });
            }
        }
    });
    
    // Sort by final score
    return Array.from(combinedResults.values())
        .sort((a, b) => b.finalScore - a.finalScore)
        .slice(0, options.topK || 20);
}

// Precompute embeddings for a batch of texts
export async function batchGenerateEmbeddings(texts, onProgress) {
    const embeddings = [];
    const pipe = await getPipeline();
    
    for (let i = 0; i < texts.length; i++) {
        const embedding = await generateEmbedding(texts[i]);
        embeddings.push(embedding);
        
        if (onProgress) {
            onProgress(i + 1, texts.length);
        }
    }
    
    return embeddings;
}

// Initialize vector search (preload model)
export async function initializeVectorSearch() {
    try {
        await getPipeline();
        return true;
    } catch (error) {
        console.error('Failed to initialize vector search:', error);
        return false;
    }
}
