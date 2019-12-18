<template>
  <div id="app">
    <div class="logo-container">
      <div class="dd-logo"></div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    margin-left: 30px;
    margin-right: 30px;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .dd-logo {
    margin: 0 auto;
    width: 402px;
    height: 185px;
    background-size: cover;
    background-image: url('./assets/logo.png');
  }
</style>
