<template>
  <ol v-if="list.children.length > 0"
      class="list"
      @mouseover="downPosition(depth)"
      :class="{[`depth${depth}`]: depth}">
    <li class="item" v-for="item in list.children">
      <div class="title" v-text="item.title"></div>
      <div class="button"
        @mousemove="handleGetItems(item)"
        @mouseleave="cancelGetItems">
        <Octicon name="chevron-right" />
      </div>
    </li>
  </ol>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Octicon from 'vue-octicon/components/Octicon';
import 'vue-octicon/icons/chevron-right';

let tid = null;
export default {
  components: {
    Octicon,
  },
  props: {
    list: {
      type: Object,
      default: {},
      required: true
    },
    depth: {
      type: Number,
      required: true
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
  }
}
</script>

<style scoped>

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  min-height: calc(100vh - 60px);
}


.item {
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
  max-width: 2em;
  max-width: 2em;
  background: transparent;
  transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
  cursor: pointer;
}

.button svg {
  transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
}


.button:hover {
  background: #3a3f4b;
}

.button:hover svg {
  fill: #568af2;
}

</style>
