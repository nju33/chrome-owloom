<template>
  <ol v-if="list.children.length > 0"
      class="list"
      @mouseover="downPosition(depth)"
      :class="{[`depth${depth}`]: depth}"
      :style="!animation && 'transition: none'">
    <li class="item" v-for="(item, idx) in list.children">
      <div class="title-wrap" v-on:click="openURL(item)">
        <span class="title" v-text="item.title"></span>
        <span v-if="search && last && idx === 0 && item.url"
              class="link-external">
          <Octicon name="link-external" scale="0.7"/>
        </span>
      </div>

      <div class="button"
        :class="{active: isShortcutRegisterd(item, idx)}"
        v-if="depth > 0 || item.shortcut"
        @click="toggleShortcut({item})">
        <Octicon name="bookmark" scale="0.7" />
      </div>
      <div v-if="!item.url" class="button"
        @mousemove="handleGetItems(item)"
        @mouseleave="cancelGetItems">
        <Octicon name="chevron-right" scale="0.7" />
      </div>
      <div v-else class="button disabled"></div>
    </li>
  </ol>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Octicon from 'vue-octicon/components/Octicon';
import 'vue-octicon/icons/chevron-right';
import 'vue-octicon/icons/bookmark';
import 'vue-octicon/icons/link-external';
import {isChrome} from '~/libs/helpers';

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
    },
    animation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      shortcutMap: []
    };
  },
  computed: {
    ...mapState([
      'index',
      'search',
      'searchedTree',
      'shortcutItems'
    ]),
    last() {
      return Boolean(this.searchedTree.length === this.depth + 1);
    }
  },
  methods: {
    ...mapActions([
      'downPosition',
      'getItems',
      'toggleShortcut'
    ]),
    handleGetItems(item) {
      if (tid) {
        clearTimeout(tid);
      }
      tid = setTimeout(() => {
        this.$store.dispatch('getItems', item);
        tid = null;
      }, 300);
    },
    cancelGetItems() {
      if (tid) {
        clearTimeout(tid);
        tid = null;
      }
    },
    openURL(item) {
      if (!item.url) {
        return;
      }

      if (isChrome()) {
        chrome.runtime.sendMessage({
          type: 'OPEN_URL',
          url: item.url
        }, () => {});
      } else {
        console.log(`[OPEN:isntChrome] ${item.url}`);
      }
    },
    isShortcutRegisterd(item, idx) {
      const sIdx = (this.shortcutItems || []).findIndex(i => i.id === item.id);
      return Boolean(sIdx > -1);
    }
  },
  mounted() {
    // const watchShortcutItems = s => {
    //   return s.shortcutItems.length;
    // };
    // this.$store.watch(watchShortcutItems, () => {
    //   this.listItems.children.unshift(...this.$store.state.sortcutItems);
    // });
  }
}
</script>

<style scoped>

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  /*min-height: calc(100vh - 60px);*/
}


.item {
  display: flex;
  border-bottom: 1px solid #181a1f;
}

.title-wrap {
  flex: auto;
  padding: .5em .75em;
  box-sizing: border-box;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
}

.title-wrap:hover {
  color: #568af2;
}

.title {
  margin-right: .3em;
  word-break: break-all;
}

.link-external svg {
  fill: #568af2;
}

.button {
  flex: auto;
  display: flex;
  align-items: center;
  padding: .5em .75em;
  box-sizing: border-box;
  max-width: 2em;
  min-width: 2em;
  background: transparent;
  transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
  cursor: pointer;
}

.button svg {
  transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
}


.button:not(.disabled):hover {
  background: #3a3f4b;
}

.button:hover svg,
.button.active svg {
  fill: #568af2;
}

</style>
