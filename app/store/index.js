import Vuex from 'vuex';
import bookmark from '~/libs/bookmark';

const store = new Vuex.Store({
  state: {
    init: false,
    index: {},
    listItems: []
  },
  mutations: {
    downPosition(state, parentId) {
      let listItems = [];
      for (const item of state.listItems) {
        if (item.parentId === parentId) {
          break;
        }
        listItems.push(item);
      }
      state.listItems = listItems;
    },

    setInitial(state, items) {
      state.index['0'] = {children: items}
      items.forEach(item => state.index[item.id] = item);
      state.listItems.push(Object.assign({}, {
        parentId: '0',
        children: items
      }));
      state.init = true;
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
    downPosition({commit}, id) {
      commit('downPosition', id);
    },

    getItems({commit}, item) {
      return new Promise(resolve => {
        console.log(item);
        bookmark.getItems(item.parentId)
          .then(items => {
            if (typeof item.parentId === 'undefined') {
              commit('setInitial', items);
            } else {
              commit('setChildren', {current: item, items});
            }
            resolve();
          })
          .catch(mockItems => {
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
