async function loadDigest() {
  const res = await fetch("digest.json");
  const digest = await res.json();

  const container = document.getElementById("digest");

  for (const group of digest) {
    const glossaryHtml = group.glossary && Object.keys(group.glossary).length > 0
      ? `<details>
          <summary>Glossary</summary>
          <dl>
            ${Object.entries(group.glossary).map(([term, def]) => `<dt>${term}</dt><dd>${def}</dd>`).join("")}
          </dl>
        </details>`
      : "";

    container.innerHTML += `
      <h2>${group.group}</h2>
      <p>${group.summary}</p>
      ${glossaryHtml}
      <ul>
        ${group.posts.map(post => `<li><a href="${post}">${post}</a></li>`).join("")}
      </ul>
    `;
  }

}

loadDigest();