const WORKER_URL = "https://throbbing-art-8b6b.vijayjacob584.workers.dev";

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

      let url =
        `${WORKER_URL}?sub=${encodeURIComponent(sub)}` +
        `&feed=${encodeURIComponent(feed.path)}` +
        `&limit=${encodeURIComponent(feed.limit)}`;

      if (feed.meta) {
        url += `&meta=${encodeURIComponent(feed.meta)}`;
      }

      console.log("Requesting:", url);

      try {

        const res = await fetch(url, {
          headers: {
            "User-Agent": USER_AGENT,
            "Accept": "application/json"
          }
        });

        if (!res.ok) {
          console.warn("Worker error", res.status);
          continue;
        }

        const data = await res.json();

        if (!data?.data?.children) continue;

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
            description: p.selftext || "",
          });

        }

      } catch (err) {
        console.error("Fetch failed:", err);
      }

      // avoid hammering worker/reddit
      await sleep(1200);

    }

  }

  return posts;
}