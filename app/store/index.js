import Vuex from 'vuex';
import bookmark from '~/libs/bookmark';

const store = new Vuex.Store({
  state: {
    index: {}
  },
  mutations: {
    setInitial(state, items) {
      state.index['0'] = {children: items}
      items.forEach(item => state.index[item.id] = item);
    },
    setChildren(state, {parentId, items}) {
      const parent = state.index[parentId];
      parent.children = items;
      state.index[parentId] = parent;

      items.forEach(item => state.index[item.id] = item);
    }
  },
  actions: {
    getItems({commit}, parentId = null) {
      return new Promise(resolve => {
        bookmark.getItems(parentId)
          .then(items => {
            if (parentId === null) {
              commit('setInitial', items);
            } else {
              commit('setChildren', {parentId, items});
            }
            resolve();
          })
          .catch(mockItems => {
            if (parentId === null) {
              commit('setInitial', mockItems);
            } else {
              commit('setChildren', {parentId, mockItems});
            }
            resolve();
          });
      });
    }
  }
})

export default store;
