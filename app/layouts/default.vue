<template>
  <div>
    <Search/>
    <nuxt/>
    <!-- <my-footer/> -->
  </div>
</template>

<script>
import Search from '~components/Search';
import MyFooter from '~components/Footer';
import bookmark from '~/libs/bookmark';

export default {
  components: {
    Search,
    MyFooter
  }
};
</script>

<style>

body {
  min-height: 100vh;
  background: #222;
  color: #9da5b4;
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
