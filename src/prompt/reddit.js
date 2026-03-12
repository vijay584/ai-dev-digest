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
    Write for a developer who is new to the AI space. Summaries must be understandable WITHOUT reading the glossary. Use plain language and analogies instead of jargon. For example, say "error messages" not "stderr", say "isolated environment" not "sandbox", say "wasting the model's memory" not "context pollution".

    Keep summaries short (2-4 sentences max) and conversational — like you're explaining it to a friend over coffee. Focus on what's happening and why it matters, not how it works internally.

    The glossary is a bonus for readers who want to go deeper — the summary should stand on its own without it.

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