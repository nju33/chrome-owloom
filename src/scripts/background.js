const OPEN_URL = 'OPEN_URL';
let currentWin = null;

chrome.commands.onCommand.addListener(command => {
  if (command !== 'open-owloom') {
    return;
  }
  createWindow();
});

chrome.browserAction.onClicked.addListener(() => {
  createWindow();
});

chrome.windows.onFocusChanged.addListener(newWinId => {
  if (currentWin === null) {
    return;
  }

  if (newWinId !== currentWin.id) {
    chrome.windows.remove(currentWin.id, () => currentWin = null);
  }
});

chrome.windows.onRemoved.addListener(winId => {
  if (currentWin !== null) {
    currentWin = null;
  }
});

chrome.runtime.onMessage.addListener(({type, url}, sender, sendRes) => {
  if (type === OPEN_URL) {
    chrome.tabs.create({url}, () => {
      if (currentWin !== null) {
        chrome.windows.remove(currentWin.id, () => currentWin = null);
      }
    });
  }
});

function createWindow() {
  if (currentWin !== null) {
    chrome.windows.update(currentWin.id, {
      focused: true
    });
    return;
  }

  chrome.windows.create({
    url: chrome.runtime.getURL('app/index.html'),
    width: 300,
    height: 485,
    type: 'popup',
    state: 'normal'
  }, win => {
    currentWin = win;
  });
}
