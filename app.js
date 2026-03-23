function extractSubreddit(url) {
  const match = url.match(/\/r\/([^/]+)/);
  return match ? `r/${match[1]}` : "r/unknown";
}

function extractPostTitle(url) {
  const match = url.match(/\/comments\/[^/]+\/([^/]+)/);
  if (!match) return url;
  return match[1].replace(/_/g, " ").replace(/\b\w/, (c) => c);
}

function truncate(text, maxLen = 40) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}

const messageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
</svg>`;

const bookSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
</svg>`;

async function loadDigest() {
  const res = await fetch("digest.json");
  const digest = await res.json();
  const container = document.getElementById("digest");

  for (const group of digest) {
    const sourcesHtml = group.posts
      .map((url) => {
        const sub = extractSubreddit(url);
        const title = truncate(extractPostTitle(url));
        return `
          <li>
            <a href="${url}" target="_blank" rel="noopener" class="source-item">
              <span class="source-dot">${messageSvg}</span>
              <span><span class="source-subreddit">${sub}</span><span class="source-title">${title}</span></span>
            </a>
          </li>`;
      })
      .join("");

    const glossaryHtml =
      group.glossary && Object.keys(group.glossary).length > 0
        ? Object.entries(group.glossary)
            .map(
              ([term, def]) =>
                `<div class="glossary-item"><dt class="glossary-term">${term}</dt><dd class="glossary-def">${def}</dd></div>`
            )
            .join("")
        : "";

    const postCount = group.posts.length;
    const glossaryCount = Object.keys(group.glossary || {}).length;

    container.innerHTML += `
      <article class="digest-entry">
        <h2 class="entry-title">${group.group}</h2>
        <p class="entry-summary">${group.summary}</p>
        <div class="entry-meta">
          <div class="sources-section">
            <div class="section-label">Sources (${postCount})</div>
            <ul class="sources-list">${sourcesHtml}</ul>
          </div>
          ${
            glossaryHtml
              ? `<div class="glossary-section">
                  <div class="section-label">${bookSvg} Glossary</div>
                  <dl class="glossary-list">${glossaryHtml}</dl>
                </div>`
              : ""
          }
        </div>
      </article>`;
  }
}

function renderCaseStudy(study, label) {
  if (!study) return '';
  
  // Parse markdown to HTML
  const explanationHtml = marked.parse(study.explanation);
  
  const keyTakeawaysHtml = study.keyTakeaways
    .map(takeaway => `<li>${takeaway}</li>`)
    .join('');
    
  const furtherReadingHtml = study.furtherReading && study.furtherReading.length > 0
    ? `<div class="further-reading">
        <h3>Further Reading</h3>
        <ul>${study.furtherReading.map(url => `<li><a href="${url}" target="_blank" rel="noopener">${url}</a></li>`).join('')}</ul>
      </div>`
    : '';
    
  const codeExampleHtml = study.codeExample 
    ? `<pre><code>${escapeHtml(study.codeExample)}</code></pre>` 
    : '';

  const relatedTopicsHtml = study.relatedTopics && study.relatedTopics.length > 0
    ? `<div class="related-topics">
        ${study.relatedTopics.map(topic => `<span class="related-topic-tag">${topic}</span>`).join('')}
      </div>`
    : '';
  
  return `
    <article class="digest-entry case-study-card">
      <div class="case-study-label">${label}</div>
      ${study.company ? `<div class="company-badge">${study.company}</div>` : ''}
      <h2 class="entry-title">${study.title}</h2>
      <p class="entry-summary">${study.summary}</p>
      <div class="case-study-content">${explanationHtml}</div>
      ${codeExampleHtml}
      <div class="key-takeaways">
        <h3>Key Takeaways</h3>
        <ul>${keyTakeawaysHtml}</ul>
      </div>
      ${furtherReadingHtml}
      ${relatedTopicsHtml}
    </article>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function loadCaseStudies() {
  try {
    const res = await fetch("case-study.json");
    const data = await res.json();
    const container = document.getElementById("case-studies");
    
    if (data.companyCaseStudy) {
      container.innerHTML += renderCaseStudy(data.companyCaseStudy, 'Company Case Study');
    }
    
    if (data.concept) {
      container.innerHTML += renderCaseStudy(data.concept, 'System Design Concept');
    }
    
    // Initialize mermaid diagrams after content is loaded
    if (window.mermaid) {
      await window.mermaid.run();
    }
  } catch (err) {
    console.error('Failed to load case studies:', err);
  }
}

loadDigest();
loadCaseStudies();
