chrome.commands.onCommand.addListener(command => {
  if (command !== 'open-owloom') {
    return;
  }

  chrome.windows.create({
    url: chrome.runtime.getURL('index.html'),
    width: 300,
    height: 485,
    type: 'popup',
    state: 'normal'
  })
});
