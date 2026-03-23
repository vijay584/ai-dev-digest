export function buildCompanyCaseStudyPrompt(recentTitles) {
  const historySection = recentTitles.length > 0 
    ? `Recently covered topics (avoid these):
${recentTitles.join(', ')}

`
    : '';

  return `
You are creating daily learning content for software developers.

${historySection}Generate a REAL COMPANY CASE STUDY.

Pick a real tech company and explain how they solved a specific engineering problem:

Companies to choose from:
- Instagram, Netflix, Uber, Discord, Stripe, Shopify, Airbnb
- Twitter/X, GitHub, GitLab, Cloudflare, Dropbox, LinkedIn
- Slack, Zoom, Spotify, Pinterest, Reddit, Twitch
- DoorDash, Lyft, Coinbase, Robinhood, Square

Topics to cover:
- Database scaling (sharding, migration, optimization)
- Real-time systems (messaging, notifications, live updates)
- High-throughput systems (payments, ride matching, content delivery)
- Reliability patterns (retries, idempotency, chaos engineering)
- Performance optimization (caching, CDN, query optimization)
- Infrastructure (deployment, monitoring, incident response)

Focus on REAL stories with specific numbers and architectural decisions.

#WRITING STYLE
- Start with a HOOK: the problem, the scale, or a surprising fact with numbers
- Tell it like a story: Problem → Challenge → Solution → Results
- Use SPECIFIC NUMBERS: "10M requests/sec", "$2M saved", "99.99% uptime", "latency dropped from 2s to 50ms"
- Make it VISUAL: Include mermaid diagrams for architecture/flows
- Use TABLES to compare approaches (Before/After, Option A vs B)
- Add personality - make it engaging, not a dry technical doc

#VISUAL ELEMENTS
Include at least ONE of these in the explanation:

1. Mermaid Flowchart:
\`\`\`mermaid
flowchart TD
  A[Start] --> B[Process]
  B --> C[End]
\`\`\`

2. Mermaid Architecture Diagram:
\`\`\`mermaid
graph LR
  Client --> LB[Load Balancer]
  LB --> S1[Server 1]
  LB --> S2[Server 2]
\`\`\`

3. Comparison Table:
| Metric | Before | After |
|--------|--------|-------|
| Latency | 2s | 50ms |
| CPU | 80% | 15% |

Structure the explanation with markdown headings (## and ###), paragraphs, and visual elements.

#TONE
Write like a tech blog post - engaging, specific, and visual. Use analogies and real numbers.

#OUTPUT
Return ONLY valid JSON (no markdown code blocks):
{
  "title": "Engaging title with company name and numbers if possible",
  "type": "case-study",
  "company": "Company name",
  "summary": "2-3 sentence hook with a surprising fact or number that makes people want to read",
  "explanation": "Main content in MARKDOWN with headings, paragraphs, mermaid diagrams, and/or tables. Make it visual and structured, not one big paragraph.",
  "keyTakeaways": ["Practical takeaway with numbers/specifics", "Takeaway 2", "Takeaway 3"],
  "codeExample": "Optional code snippet if relevant, else null",
  "furtherReading": ["Real URL 1", "Real URL 2"],
  "relatedTopics": ["Related topic 1", "Related topic 2"]
}
`;
}

export function buildConceptPrompt(recentTitles) {
  const historySection = recentTitles.length > 0 
    ? `Recently covered topics (avoid these):
${recentTitles.join(', ')}

`
    : '';

  return `
You are creating daily learning content for software developers.

${historySection}Explain a SYSTEM DESIGN CONCEPT or PATTERN.

Pick a fundamental concept that developers should understand:

Distributed Systems:
- Consistent hashing, circuit breaker pattern, saga pattern
- Event sourcing, CQRS, message queues
- Distributed locks, consensus algorithms

Performance & Optimization:
- Caching strategies (write-through, write-back, cache-aside)
- Database indexing, query optimization
- Load balancing algorithms

Architecture Patterns:
- Microservices patterns, API gateway pattern
- Bulkhead pattern, retry strategies
- Observability patterns (tracing, metrics, logging)

Explain with practical examples, when to use it, and common pitfalls.

#WRITING STYLE
- Start with WHY it matters - a real-world problem this solves
- Use ANALOGIES to explain complex concepts
- Include VISUAL DIAGRAMS using mermaid syntax
- Show BEFORE/AFTER comparisons with tables
- Add CODE EXAMPLES in the explanation when helpful
- Make it engaging and visual, not just text

#VISUAL ELEMENTS
Include at least ONE of these in the explanation:

1. Mermaid Flowchart showing how it works:
\`\`\`mermaid
flowchart TD
  A[Request] --> B{Check}
  B -->|Pass| C[Process]
  B -->|Fail| D[Reject]
\`\`\`

2. Mermaid Sequence Diagram:
\`\`\`mermaid
sequenceDiagram
  Client->>Server: Request
  Server->>Cache: Check
  Cache-->>Server: Hit/Miss
\`\`\`

3. Comparison Table:
| Approach | Pros | Cons | When to Use |
|----------|------|------|-------------|
| Option A | Fast | Limited | Small scale |
| Option B | Scalable | Complex | Large scale |

Structure with markdown headings (## and ###), use bold/italic for emphasis.

#TONE
Write like an engaging tech blog post. Use analogies, real examples, and make it visual.

#OUTPUT
Return ONLY valid JSON (no markdown code blocks):
{
  "title": "Engaging title that makes people curious",
  "type": "concept",
  "company": null,
  "summary": "2-3 sentence hook explaining why this matters and what problem it solves",
  "explanation": "Main content in MARKDOWN with headings, mermaid diagrams, tables, and/or code examples. Make it visual and structured.",
  "keyTakeaways": ["Practical takeaway 1", "Takeaway 2", "Takeaway 3"],
  "codeExample": "Optional additional code snippet, else null",
  "furtherReading": ["Real URL 1", "Real URL 2"],
  "relatedTopics": ["Related topic 1", "Related topic 2"]
}
`;
}
