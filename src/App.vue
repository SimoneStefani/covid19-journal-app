<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "App",

  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      user
        ? this.$router.push({ name: "Home" })
        : this.$router.push({ name: "Login" });
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
