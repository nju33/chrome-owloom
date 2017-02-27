<template>
  <form class="form">
    <input type="text" class="text" v-model.lazy="text"/>
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    };
  },
  watch: {
    text(val, oldVal) {
      if (val && val !== oldVal) {
        console.log('search');
      }
    }
  }
}
</script>

<style scoped>

.form {
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
