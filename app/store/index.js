import Vuex from 'vuex';
import bookmark from '~/libs/bookmark';
import {flatten, debounce} from 'lodash';
import Fuse from 'fuse.js';
import {isChrome} from '~/libs/helpers';

const store = new Vuex.Store({
  state: {
    search: false,
    searchedTree: [],
    index: {},
    shortcutItems: [],
    listItems: [],
    tree: [],
    flattenTree: []
  },
  mutations: {
    downPosition(state, depth) {
      if (state.search) {
        state.searchedTree = state.searchedTree.slice(0, depth + 1);
      } else {
        state.listItems = state.listItems.slice(0, depth + 1);
      }
    },

    setShortcutItems(state, items) {
      state.shortcutItems = items || [];
    },

    saveShortcutItems(state) {
      if (isChrome()) {
        chrome.storage.sync.set({
          shortcutItems: state.shortcutItems
        }, () => {});
      } else {
        console.log('[] saveShortcutItems');
      }
    },

    setInitial(state, items) {
      state.index['0'] = {children: items}
      items.forEach(item => state.index[item.id] = item);

      state.shortcutItems.forEach(i => i.shortcut = true);
      items.unshift(...state.shortcutItems);

      state.listItems.push({
        parentId: '0',
        children: items
      });
      state.tree = items;
    },

    setChildren(state, {current, items}) {
      const parent = state.index[current.parentId];
      parent.children = items;
      state.index[current.parentId] = parent;

      items.forEach(item => state.index[current.id] = item);

      if (state.search) {
        state.searchedTree.push(Object.assign({}, current, {
          children: items
        }));
      } else {
        state.listItems.push(Object.assign({}, current, {
          children: items
        }));
      }
    },

    flattenTree(state) {
      const flattenTree = state.tree.reduce((result, item) => {
        const children = flatten(getChildren(item));
        result = result.concat(children);
        return result;
      }, []);

      state.flattenTree = flattenTree;

      function getChildren(item) {
        if (!item.children || item.children.length === 0) {
          return [item];
        }

        return item.children.reduce((result, _item) => {
          const items = getChildren(_item);
          result = result.concat(items);
          return result;
        }, [item]);
      }
    },

    search(state, word) {
      if (word === '') {
        state.search = false;
        return;
      }

      if (!state.search) {
        state.search = true;
      }

      const fuse = new Fuse(state.flattenTree, {keys: ['title']})
      const matches = fuse.search(word);
      /*
        listItems = [
          {
            title: ...
            children: [...]
          },
          {...}
        ]
       */
      if (matches.length > 0) {
        state.searchedTree = [{children: matches}];
      } else {
        state.searchedTree = [{children: bookmark.EMPTY}];
      }
    },

    toggleShortcut(state, {item}) {
      const sIdx = state.shortcutItems.findIndex(i => i.id === item.id);

      item.shortcut = true;
      if (sIdx !== -1) {
        state.shortcutItems.splice(sIdx, 1);
      } else {
        state.shortcutItems.unshift(item);
      }

      const rootItem = state.listItems[0];
      rootItem.children = rootItem.children.filter(i => !i.shortcut);
      rootItem.children.unshift(...state.shortcutItems);
    }
  },
  actions: {
    downPosition: debounce(({commit}, depth) => {
      commit('downPosition', depth);
    }, 200),

    getShortcutItems({commit}) {
      return new Promise(resolve => {
        if (isChrome()) {
          chrome.storage.sync.get(null, res => {
            commit('setShortcutItems', res.shortcutItems);
          });
        } else {
          console.log('[] getshortcutitems');
        }
        resolve();
      });
    },

    getItems({commit}, item = {}) {
      return new Promise(resolve => {
        bookmark.getItems(item.id)
          .then(items => {
            if (items.length === 0) {
              items = bookmark.EMPTY;
            }
            console.log(`[GET:isChrome] length: ${items.length}`);
            if (typeof item.id === 'undefined') {
              commit('setInitial', items);
            } else {
              commit('setChildren', {current: item, items});
            }
            resolve();
          })
          .catch(mockItems => {
            console.log(`[GET:isntChrome] length: ${mockItems.length}`);
            if (typeof item.id === 'undefined') {
              commit('setInitial', mockItems);
            } else {
              commit('setChildren', {current: item, items: mockItems});
            }
            resolve();
          });
      });
    },

    flatten({commit, state}) {
      commit('flattenTree');
    },

    search({commit}, word) {
      commit('search', word);
    },

    toggleShortcut({commit}, data) {
      commit('toggleShortcut', data);
      commit('saveShortcutItems');
    }
  }
})

export default store;
