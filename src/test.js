import { fetchRedditPosts } from "./fetchers/reddit.js";

async function run() {

  const posts = await fetchRedditPosts();

  console.log("Total posts:", posts.length);
  console.log(posts.slice(0,5));

}

run();