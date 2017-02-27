<template>
  <ol class="list">
    <li class="item" v-for="item in items">
      <div v-text="item.title" @click="fetchChildren(item.id)"></div>
    </li>
  </ol>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: ['id'],
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
  watch: {
    id(val) {
      this.items = (this.index[val] || {children: []}).children;
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
}

.item {
  padding: .5em .75em;
  cursor: pointer;
}

</style>
