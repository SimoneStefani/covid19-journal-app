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
    const routeName = this.$route.name ? this.$route.name : "Home";
    firebase.auth().onAuthStateChanged(user => {
      user
        ? this.$router.push({ name: routeName })
        : this.$router.push({ name: "Login" });
    });
  }
};
</script>
