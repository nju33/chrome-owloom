<template>
  <ol class="list"
      :class="{[`depth${list.depth}`]: list.depth}">
    <li class="item" v-for="item in items">
      <!-- <div @click="getItems(item.id)"> -->
      <div class="title" v-text="item.title"
        @mouseover="downPosition(list)"
      ></div>
      <div class="button"
        @mousemove="handleGetItems(item)"
        @mouseleave="cancelGetItems">
      </div>
    </li>
  </ol>
</template>

<script>
import {mapState, mapActions} from 'vuex';

let tid = null;
export default {
  props: {
    list: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapState([
      'index'
    ])
  },
  methods: {
    ...mapActions([
      'downPosition',
      'getItems'
    ]),
    handleGetItems(item) {
      if (tid) {
        clearTimeout(tid);
      }
      tid = setTimeout(() => {
        this.$store.dispatch('getItems', item);
        tid = null;
      }, 500);
    },
    cancelGetItems() {
      if (tid) {
        clearTimeout(tid);
        tid = null;
      }
    }
  },
  mounted() {
    this.$store.watch(s => s.init, () => {
      this.items = this.$store.state.index[this.list.parentId].children;
    });
  }
}
</script>

<style scoped>

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  min-height: calc(100vh - 34px);
}


.item {
  cursor: pointer;
  display: flex;
  border-bottom: 1px solid #181a1f;
}

.title {
  flex: auto;
  padding: .5em .75em;
  box-sizing: border-box;
}

.button {
  flex: auto;
  padding: .5em .75em;
  box-sizing: border-box;
  max-width: 3em;
  max-width: 3em;
  background: #3a3f4b;
}

</style>
