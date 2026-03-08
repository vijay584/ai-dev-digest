async function loadDigest() {
  const res = await fetch("digest.json");
  const digest = await res.json();

  const container = document.getElementById("digest");

  for (const group of digest) {
    container.innerHTML += `
      <h2>${group.group}</h2>
      <p>${group.summary}</p>
      <ul>
        ${group.posts.map(post => `<li><a href="${post}">${post}</a></li>`).join("")}
      </ul>
    `;
  }

}

loadDigest();