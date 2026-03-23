import fs from 'fs';

const HISTORY_FILE = 'case-study-history.json';

export function loadHistory() {
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  } catch {
    return [];
  }
}

export function getRecentTitles(history, count = 20) {
  return history.slice(-count).map(h => h.title);
}

export function saveHistory(history, newEntry) {
  history.push({
    title: newEntry.title,
    date: new Date().toISOString(),
    type: newEntry.type,
    company: newEntry.company || null
  });
  
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}
