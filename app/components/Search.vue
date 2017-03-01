<template>
  <form class="form" v-on:submit.prevent="openSelectedItemURL">
    <input ref="text" type="text" class="text" v-model="text">
      <!-- v-on:keypress.prevent.enter="openSelectedItemURL"/> -->
  </form>
</template>

<script>
import {mapState} from 'vuex';
import {debounce} from 'lodash';
import {isChrome} from '~/libs/helpers';

export default {
  data() {
    return {
      text: ''
    };
  },
  computed: {
    ...mapState([
      'search'
    ])
  },
  mounted() {
    this.$refs.text.focus();
  },
  methods: {
    openSelectedItemURL() {
      const state = this.$store.state;
      if (!state.search) {
        return;
      }

      const item = state.searchedTree[state.searchedTree.length - 1].children[0]

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
    }
  },
  watch: {
    text: debounce(function (val, oldVal) {
      if (val && val !== oldVal) {
        if (this.$store.state.flattenTree.length === 0) {
          this.$store.dispatch('flatten');
        }
      }
      this.$store.dispatch('search', val);
    }, 200)
  },
}
</script>

<style scoped>

.form {
  position: relative;
  z-index: 9;
  border-bottom: 1px solid #181a1f;
}

.text {
  box-sizing: border-box;
  width: 100%;
  background: #202634;
  border: none;
  font-size: .95em;
  padding: .5em .75em;
  color: #d7dae0;
  outline: 2px solid transparent;
  outline-offset: -2px;
  transition: outline .2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.text:focus {
  outline: 2px solid #568af2;
}

</style>
