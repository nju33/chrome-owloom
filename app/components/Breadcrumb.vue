<template>
  <ol class="list">
    <li class="item" v-for="(name, idx) in schema">
      <span v-text="name" @click="downPosition(idx)"></span>
    </li>
  </ol>
</template>

<script>
import {mapActions} from 'vuex';
import {compact} from 'lodash';

export default {
  computed: {
    schema() {
      const titles = this.$store.state.listItems.map(item => {
        if (!item.title) {
          return null;
        }
        return item.title;
      });
      return compact(titles);
    }
  },
  methods: mapActions([
    'downPosition'
  ])
}
</script>

<style scoped>
.list {
  position: relative;
  z-index: 9;
  overflow: hidden;
  font-size: .75em;
  padding: .5em;
  background: #222;
  height: 13.2px;
}
.item {
  float: left;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
}
.item:hover {
  color: #568af2;
}
.item:nth-child(n+2):before,
.item:nth-child(n+2):hover:before {
  content: '/';
  margin: 0 .35em;
  color: #d7dae0;
}
</style>
