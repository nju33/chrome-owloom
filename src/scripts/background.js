chrome.commands.onCommand.addListener(command => {
  if (command !== 'open-owloom') {
    return;
  }

  chrome.windows.create({
    url: chrome.runtime.getURL('app/index.html'),
    width: 300,
    height: 485,
    type: 'popup',
    state: 'normal'
  })
});
