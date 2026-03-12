import { fetchRedditPosts } from "./fetchers/reddit.js";
// import { fetchHNPosts } from "./fetchers/hackernews.js";
// import { fetchGithubTrending } from "./fetchers/github.js";

import { filterPosts } from "./pipeline/filter.js";
import { generateDigest } from "./pipeline/digest.js";
import { loadCache, saveCache } from "./pipeline/cache.js";
import { buildRedditPrompt } from "./prompt/reddit.js";
import dotenv from "dotenv";
dotenv.config();
import { summarize } from "./llm/summarizer.js";
import fs from 'fs';


const extractDigest = (summary) => {
  if (!summary) {
    return;
  }

  let json = summary;

  if (summary.includes("```json")) {
    json = summary.split("```json")[1].split("```")[0];
  } else if (summary.includes("```")) {
    json = summary.split("```")[1].split("```")[0];
  }

  return JSON.parse(json.trim());
}

const saveDigest = (digest) => {
  console.log('...saving digest', digest);
  fs.writeFileSync('digest.json', JSON.stringify(digest, null, 2));
}


async function run() {

  console.log("Fetching sources...");

  const reddit = await fetchRedditPosts();
  const hn = [];
  // await fetchHNPosts();
  const github = [];
  // await fetchGithubTrending();

  const posts = [...reddit, ...hn, ...github];

  console.log(`Fetched ${posts.length} posts`);

  const filtered = filterPosts(posts);

  console.log(`Filtered ${filtered.length} relevant posts`);

  const cache = loadCache();

  const newPosts = [];

  for (const post of filtered) {

    const id = post.url;

    if (!cache[id]) {

      cache[id] = {
        firstSeen: Date.now(),
        reported: true
      };

      newPosts.push(post);

    }

  }

  const prompt = buildRedditPrompt(newPosts);

  if (!prompt) {
    console.log("No new posts to summarize. Skipping.");
    saveCache(cache);
    return;
  }

  console.log('...prompt', prompt);

  const summary = await summarize(prompt);
  console.log('...summary', summary);
  
  const newDigest = extractDigest(summary);
  // const digest = generateDigest(newPosts);

  saveDigest(newDigest);

  console.log("\n");
  // console.log(digest);

  saveCache(cache);

}

run();