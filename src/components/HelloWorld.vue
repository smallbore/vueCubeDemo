<template>
  <div class="hello">
    <cube-button>Button</cube-button>
    <h1>{{ msg }}</h1>
    <cube-loading></cube-loading>
    <cube-loading :size="28"></cube-loading>
    <cube-loading :size="40"></cube-loading>
    
    <cube-button @click="showToast">show toast</cube-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toastTxt: 'cube toast content'
    }
  },
  methods: {
    showToast () {
      this.$createToast({
        txt: this.toastTxt
      }).show()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
