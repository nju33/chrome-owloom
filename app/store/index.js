import Vuex from 'vuex';
import bookmark from '~/libs/bookmark';
import {debounce} from 'lodash';

const store = new Vuex.Store({
  state: {
    index: {},
    listItems: []
  },
  mutations: {
    downPosition(state, depth) {
      state.listItems = state.listItems.slice(0, depth + 1);
    },

    setInitial(state, items) {
      state.index['0'] = {children: items}
      items.forEach(item => state.index[item.id] = item);
      state.listItems.push({
        parentId: '0',
        children: items
      });
    },

    setChildren(state, {current, items}) {
      const parent = state.index[current.parentId];
      parent.children = items;
      state.index[current.parentId] = parent;

      items.forEach(item => state.index[current.id] = item);
      state.listItems.push(Object.assign({}, current, {
        children: items
      }));
    }
  },
  actions: {
    downPosition: debounce(({commit}, depth) => {
      commit('downPosition', depth);
    }, 200),

    getItems({commit}, item = {}) {
      return new Promise(resolve => {
        bookmark.getItems(item.parentId)
          .then(items => {
            console.log('.then');
            console.log(items);
            if (typeof item.parentId === 'undefined') {
              commit('setInitial', items);
            } else {
              commit('setChildren', {current: item, items});
            }
            resolve();
          })
          .catch(mockItems => {
            console.log('.catch');
            console.log(mockItems);
            if (typeof item.parentId === 'undefined') {
              commit('setInitial', mockItems);
            } else {
              commit('setChildren', {current: item, items: mockItems});
            }
            resolve();
          });
      });
    },

    // fetchChildren({commit}, parentId = null) {
    //   if (parentId === null) {
    //     throw new Error(
    //       '[Error in action:fetchChildren] `parentId` is required'
    //     );
    //   }
    //
    //   bookmark.getChildren(parentId)
    //     .then(children => {
    //       commit('setChildren', {parentId, items: children});
    //     })
    //     .catch(mockChildren => {
    //       commit('setChildren', {parentId, items: mockChildren});
    //     });
    // }
  }
})

export default store;
