const subreddits = [
  "LocalLLaMA",
  "MachineLearning",
  // "ChatGPT",
  // "OpenAI",
  // "GeminiAI",
  // "ClaudeAI",
  // "cursor",
  // "AI_India",
  // "mcp",
];

const feeds = [
  { path: "new", limit: 100 },
  { path: "rising", limit: 50 },
  { path: "top", limit: 50, meta: "t=day" }
];

const USER_AGENT = "ai-dev-digest/1.0 (by /u/vijai)";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchRedditPosts() {

  const posts = [];
  const seen = new Set();

  for (const sub of subreddits) {

    console.log(`Fetching r/${sub}`);

    for (const feed of feeds) {
      console.log('....USER_AGENT', USER_AGENT);
      let url =
        `https://throbbing-art-8b6b.vijayjacob584.workers.dev`;

      if (feed.meta) {
        url += `&${feed.meta}`;
      }

      const res = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          "Accept": "application/json"
        }
      });
      

      const data = await res.json();

      for (const child of data.data.children) {

        const p = child.data;

        if (seen.has(p.id)) continue;

        seen.add(p.id);

        posts.push({
          source: "reddit",
          subreddit: sub,
          title: p.title,
          score: p.score,
          comments: p.num_comments,
          url: `https://reddit.com${p.permalink}`,
          createdAt: p.created_utc * 1000,
          description: p.selftext,
        });

      }

      await sleep(1200);

    }

  }

  return posts;

}
