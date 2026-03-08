const MAX_AGE = 48 * 60 * 60 * 1000;

export function filterPosts(posts) {

  const now = Date.now();

  const filtered = posts.filter(post => {

    const age = now - post.createdAt;

    const recent = age < MAX_AGE;

    const engagement =
      post.score >= 20 ||
      post.comments >= 10;

    return recent && engagement;

  });

  return filtered.sort((a, b) =>
    (b.score + b.comments * 2) -
    (a.score + a.comments * 2)
  );

}