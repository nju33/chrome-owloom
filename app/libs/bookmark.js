import {isChrome} from './helpers';

class Bookmark {
  constructor() {
    this.EMPTY = [
      {
        id: null,
        index: null,
        parentId: null,
        url: null,
        title: 'There is no content 😣'
      }
    ];

    this.mock = {
      id: 2,
      initial: [
        {
          id: '1',
          index: 0,
          parentId: '0',
          title: 'Bookmarks Bar',
          children: [
            {title: 'foo', parentId: '1', id:'10', children: []},
            {title: 'bar', parentId: '1', id:'10', children: [
              {title: 'bar-child', parentId: '1', id:'10', url:'bar-child'}
            ]},
            {title: 'baz', parentId: '1', id:'10', children: [
              {title: 'baz-child', parentId: '1', id:'10', children: []}
            ]},
            {title: 'testtest', parentId: '1', id:'10', url: 'hoge'},
          ]
        },
        {
          id: '2',
          index: 1,
          parentId: '0',
          title: 'Other Bookmarks',
          children: [
            {title: 'hoge', parentId: '1', id:'10', children: []},
            {title: 'fuga', parentId: '1', id:'10', children: []},
            {title: 'piyo', parentId: '1', id:'10', children: []}
          ]
        }
      ],
      generateChildren(parentId, length = 5) {
        const items = Array(length).fill(null).map((item, index) => {
          const id = String(this.id++);
          // 1 or 0
          if (Math.round(Math.random())) {
            return {
              id,
              index,
              parentId,
              title: `mock${id}`,
              children: []
            };
          } else {
            return {
              id,
              index,
              parentId,
              title: `mock${id}`,
              url: 'http://foo.com'
            };
          }
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
        chrome.bookmarks.getSubTree(parentId, ([tree]) => {
          resolve(tree.children);
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
