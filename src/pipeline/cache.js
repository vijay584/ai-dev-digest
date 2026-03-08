import fs from "fs";

const CACHE_FILE = "cache.json";

export function loadCache() {

  if (!fs.existsSync(CACHE_FILE)) {
    return {};
  }

  const raw = fs.readFileSync(CACHE_FILE);
  return JSON.parse(raw);

}

export function saveCache(cache) {

  fs.writeFileSync(
    CACHE_FILE,
    JSON.stringify(cache, null, 2)
  );

}