export function buildRedditPrompt(posts) {
    if (!posts || posts.length === 0) {
      return null;
    }

    let text = `
    You are a helpful assistant that groups similar Reddit discussions about AI development and summarizes them for developers.

    IMPORTANT: Only use the posts provided below. Do NOT invent, fabricate, or hallucinate any posts, links, or summaries. If no posts are provided, return an empty JSON array: []

    #INPUT
    posts: ${posts.map(p => `Title: ${p.title}\nDescription: ${p.description}\nLink: ${p.url}`).join("\n\n")}

    #RULES
    Focus on topics developers care about:
    - new AI models
    - developer tools
    - AI editors / IDE integrations
    - MCP / agent frameworks
    - benchmarks and evaluations
    - real-world developer workflows using AI
    - remarks from AI leaders

    #TONE
    Write like a friendly tech newsletter, not a research paper. Keep summaries short (2-4 sentences max), conversational, and highlight the "why should I care" angle for each group. Avoid jargon where possible. When you must use technical terms, include them in the glossary.

    #OUTPUT
    Return a JSON array:
    [{
        "group": "Short punchy group title",
        "summary": "2-4 sentence conversational summary. Focus on what matters and why a developer should care.",
        "posts": ["links to the posts"],
        "glossary": { "term": "Plain English definition aimed at someone new to AI development" }
    }]
  `;

    return text;
  }