import {isChrome} from './helpers';

class Bookmark {
  constructor() {
    this.mock = {
      initial: [
        {
          id: '1',
          index: 0,
          parentId: '0',
          title: 'Bookmarks Bar',
          children: []
        },
        {
          id: '2',
          index: 1,
          parentId: '0',
          title: 'Other Bookmarks',
          children: []
        }
      ]
    }
  }

  getItems() {
    return new Promise((resolve, reject) => {
      if (isChrome()) {
        reject(this.mock.initial);
      }

      chrome.bookmarks.getTree(([tree]) => {
        resolve(tree.children);
      });
    });
  }
}

export default new Bookmark();
