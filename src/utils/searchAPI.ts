interface SearchMatch {
    distance?: number;
    [key: string]: unknown;
}

interface SearchResult {
    title: string;
    excerpt: string;
    url: string;
    identifier: string;
    modDate: string;
    score: number;
    matches: SearchMatch[];
    contentType: string;
}

interface AISource {
    title: string;
    url: string;
    contentType: string;
    score: number;
}

interface AIResponse {
    response: string;
    sources: AISource[];
}

/**
 * Search content using dotAI search API
 */
export async function searchContent(query: string, indexName = "default", limit = 10): Promise<SearchResult[]> {
    if (!query.trim()) throw new Error("Search query is required");
    if (!process.env.NEXT_PUBLIC_DOTCMS_HOST || !process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN) {
        throw new Error("dotCMS configuration is missing");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}api/v1/ai/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
            prompt: query.trim(),
            indexName,
            searchLimit: limit,
            searchOffset: 0,
            threshold: 0.25,
            stream: false
        })
    });

    if (!response.ok) throw new Error(`Search failed: ${response.status}`);

    const data = await response.json();

    return data.dotCMSResults
        ?.sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
            ((a.matches as SearchMatch[])?.[0]?.distance || 0) - ((b.matches as SearchMatch[])?.[0]?.distance || 0)
        )
        ?.map((result: Record<string, unknown>) => {
            const contentlet = (result.contentlet || result) as Record<string, unknown>;
            return {
                title: (contentlet.title || contentlet.urlTitle || 'Untitled') as string,
                excerpt: (contentlet.teaser || contentlet.body || 'No description available') as string,
                url: (contentlet.urlMap || contentlet.urlTitle || '#') as string,
                identifier: contentlet.identifier as string,
                modDate: contentlet.modDate as string,
                score: (result.matches as SearchMatch[])?.[0]?.distance || 0,
                matches: (result.matches || []) as SearchMatch[],
                contentType: (contentlet.contentType || 'Unknown') as string
            };
        }) || [];
}

/**
 * Generate AI response using dotAI completions API
 */
export async function generateAIResponse(prompt: string): Promise<AIResponse> {
    if (!prompt.trim()) throw new Error("Prompt is required");
    if (!process.env.NEXT_PUBLIC_DOTCMS_HOST || !process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN) {
        throw new Error("dotCMS configuration is missing");
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}api/v1/ai/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
                prompt: prompt.trim(),
                searchLimit: 20,
                searchOffset: 0,
                responseLengthTokens: 500,
                language: 1,
                stream: false,
                fieldVar: "body",
                indexName: "default",
                threshold: 0.25,
                temperature: 0.7,
                model: "gpt-5",
                operator: "<=>",
            })
        });

        if (!response.ok) throw new Error(`AI generation failed: ${response.status}`);

        const data = await response.json();

        const aiResponse = data.openAiResponse?.choices?.[0]?.message?.content || 'No response generated';
        const sources: AISource[] = data.dotCMSResults?.map((result: Record<string, unknown>) => {
            const contentlet = (result.contentlet || result) as Record<string, unknown>;
            return {
                title: (contentlet.title || contentlet.urlTitle || 'Untitled') as string,
                url: (contentlet.urlMap || contentlet.urlTitle || '#') as string,
                contentType: (contentlet.contentType || 'Unknown') as string,
                score: (result.matches as SearchMatch[])?.[0]?.distance || 0
            };
        }) || [];

        return { response: aiResponse, sources };
    } catch (error) {
        console.error('AI generation error:', error);
        throw new Error(`AI generation failed: ${(error as Error).message}`);
    }
}
