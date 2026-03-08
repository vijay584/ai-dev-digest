export function buildRedditPrompt(posts) {
    let text = `
    You are a helpful assistant that filters based on the rules below and groups together similar Reddit discussions about AI development and summarizes them.
  
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

    #OUTPUT
    [{
        "group": "The group of the posts.",
        "summary": "A summary of the posts in a way that is easy to understand and use for a developer.",
        "posts": [links to the posts]
    }]
  `;
  
    return text;
  }