import {isChrome} from './helpers';

class Bookmark {
  constructor() {
    this.mock = {
      id: 2,
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
      ],
      generateChildren(parentId, length = 3) {
        const items = Array(3).fill(null).map((item, index) => {
          const id = String(this.id++)
          return {
            id,
            index,
            parentId,
            title: `mock${id}`,
            children: []
          };
        });
        return items;
      }
    }
  }

  getItems(parentId) {
    return new Promise((resolve, reject) => {
      if (!isChrome()) {
        const items = typeof parentId === 'undefined' ?
                      this.mock.initial :
                      this.mock.generateChildren(parentId);
        reject(items);
        return;
      }

      if (parentId) {
        chrome.bookmarks.getChildren(parentId, chilren => {
          resolve(children);
        });
      } else {
        chrome.bookmarks.getTree(([tree]) => {
          resolve(tree.children);
        });
      }
    });
  }
}

export default new Bookmark();
