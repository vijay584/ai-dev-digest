export async function fetchHNPosts() {

  const ids = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  ).then(r => r.json());

  const topIds = ids.slice(0, 20);

  const posts = await Promise.all(
    topIds.map(async id => {

      const item = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      ).then(r => r.json());

      return {
        source: "hackernews",
        title: item.title,
        url: item.url || `https://news.ycombinator.com/item?id=${id}`
      };

    })
  );

  return posts;
}