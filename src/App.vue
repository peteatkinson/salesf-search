<template>
  <div class="app">
    <SalesfireStore />
  </div>
</template>
<script>
import SalesfireStore from "./components/SalesfireStore/SalesfireStore.vue";

export default {
  name: "App",
  components: {
    SalesfireStore,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: absolute;
  width: 100%;
  height: 100vh;
}
body {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
