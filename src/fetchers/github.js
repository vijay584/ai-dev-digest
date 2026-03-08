export async function fetchGithubTrending() {

  const res = await fetch(
    "https://api.github.com/search/repositories?q=ai&sort=stars&order=desc&per_page=10"
  );

  const data = await res.json();

  return data.items.map(repo => ({
    source: "github",
    title: repo.full_name,
    url: repo.html_url
  }));
}