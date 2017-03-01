<template>
  <div>
    <Search ref="search"/>
    <Breadcrumb ref="breadcrumb"/>
    <Bookmark ref="bookmark" :listItems="listItems"/>
    <!-- <nuxt/> -->
    <!-- <my-footer/> -->
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import MyFooter from '~components/Footer';
import Search from '~components/Search';
import Breadcrumb from '~components/Breadcrumb';
import bookmark from '~/libs/bookmark';
import Bookmark from '~components/Bookmark';

export default {
  components: {
    Search,
    Breadcrumb,
    Bookmark,
    MyFooter
  },
  computed: mapState([
    'index',
    'listItems'
  ]),
  methods: mapActions([
    'getShortcutItems',
    'getItems'
  ]),
  mounted() {
    this.getShortcutItems()
      .then(() => this.getItems());

    const searchHeight = this.$refs.search.$el.clientHeight
    const breadcrumbHeight = this.$refs.breadcrumb.$el.clientHeight;
    const offset = searchHeight + breadcrumbHeight;
    this.$refs.bookmark.$el.style.cssText =
      `height: calc(100vh - ${offset}px)`;
  }
};
</script>

<style>

body {
  min-height: 100vh;
  background: #222;
  color: #9da5b4;
  outline: 100vw solid #222;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Noto Sans Japanese", "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial, Meiryo, sans-serif;
}

ol,li {
  list-style: none;
  padding: 0;
  margin: 0;
}

/*.container {
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited {
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus {
  color: #fff;
  background-color: #3B8070;
}

.title {
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}*/
</style>
