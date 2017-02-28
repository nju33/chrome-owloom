<template>
  <div class="bookmark">
    <transition-group name="list" tag="section">
      <template v-for="(list, idx) in listItems">
        <List class="child-list"
              :key="list"
              :list="list"
              :depth="idx"
              :class="`depth${idx}`"/>
      </template>
    </transition-group>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import List from '~components/List';

export default {
  components: {
    List
  },
  props: {
    listItems: {
      type: Array,
      default: () => []
    }
  },
  // data() {
  //   return {};
  // },
  // computed: {
  //   ...mapState([
  //     // 'index',
  //     // 'listItems'
  //   ])
  // },
  // mounted() {
  // }
}
</script>

<style scoped>

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  transition: all .3s;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

/*.list-enter-active, .list-leave-active {*/
/*}*/


.child-list {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
  outline: 100vw solid rgba(0,0,0,.5);
  background: #222;
}

.child-list.depth1 {
  transform: translate3d(2em, 0, 0);
  width: calc(100% - 2em);
  /*background: blue;*/
  z-index: 1.1;
}
.child-list.depth2 {
  transform: translate3d(4em, 0, 0);
  width: calc(100% - 4em);
  /*background: orange;*/
  z-index: 1.2;
}
.child-list.depth3 {
  transform: translate3d(6em, 0, 0);
  width: calc(100% - 6em);
  /*background: yellow;*/
  z-index: 1.3;
}
.child-list.depth4 {
  transform: translate3d(8em, 0, 0);
  width: calc(100% - 8em);
  /*background: white;*/
  z-index: 1.4;
}
.child-list.depth5 {
  transform: translate3d(10em, 0, 0);
  width: calc(100% - 10em);
  /*background: blue;*/
  z-index: 1.5;
}
.child-list.depth6 {
  transform: translate3d(12em, 0, 0);
  width: calc(100% - 12em);
  /*background: blue;*/
  z-index: 1.6;
}
.child-list.depth7 {
  transform: translate3d(14em, 0, 0);
  width: calc(100% - 14em);
  /*background: blue;*/
  z-index: 1.7;
}
.child-list.depth8 {
  transform: translate3d(16em, 0, 0);
  width: calc(100% - 16em);
  /*background: blue;*/
  z-index: 1.8;
}
.child-list.depth9 {
  transform: translate3d(18em, 0, 0);
  width: calc(100% - 18em);
  /*background: blue;*/
  z-index: 1.9;
}

.child-list.list-enter {
  transform: translate3d(100vw, 0, 0);
  outline: 2em solid rgba(0,0,0,0);
}

.child-list.list-leave-to {
  transform: translate3d(100vw, 0, 0);
  outline: 2em solid rgba(0,0,0,0);
}

.item {
  padding: .5em .75em;
  cursor: pointer;
}

</style>
