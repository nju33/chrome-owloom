export function isChrome() {
  return Boolean('chrome' in window && chrome.bookmarks);
}
