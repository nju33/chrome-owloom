<template>
  <section class="container">
    <Bookmark :listItems="listItems"/>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Bookmark from '~components/Bookmark';
// import List from '~components/List';
import bookmark from '~/libs/bookmark';

export default {
  components: {
    Bookmark
  },
  data() {
    return {
      list: {}
    };
  },
  computed: mapState([
    'index',
    'listItems'
  ]),
  methods: mapActions([
    'getItems'
  ]),
  mounted() {
    // const list = {
    //   parentId: '0'
    // };
    this.getItems();
    // this.getItems({}).then(() => {
      // this.list = list;
    // });
  }
};
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
