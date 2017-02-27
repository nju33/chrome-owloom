<template>
  <section class="container">
    <List :id="id"/>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import List from '~components/List';
import bookmark from '~/libs/bookmark';

export default {
  components: {
    List
  },
  data() {
    return {
      id: null
    };
  },
  computed: mapState([
    'index'
  ]),
  methods: mapActions([
    'getItems'
  ]),
  mounted() {
    this.getItems().then(() => {
      this.id = '0';
    });
  }
};
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
