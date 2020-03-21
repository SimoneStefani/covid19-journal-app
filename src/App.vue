<template>
  <div id="app" class="min-h-screen">
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
