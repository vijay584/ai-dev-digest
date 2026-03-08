export function generateDigest(posts) {

  const top = posts.slice(0, 15);

  let text = "AI Dev Digest\n\n";

  for (const post of top) {

    text += `${post.title}\n`;
    text += `${post.url}\n`;
    text += `Score: ${post.score} | Comments: ${post.comments}\n\n`;

  }

  if (top.length === 0) {
    text += "No new posts today.";
  }

  return text;

}