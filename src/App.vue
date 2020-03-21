<template>
  <div id="app" class="flex justify-center h-screen p-10 bg-gray-300">
    <div
      class="h-auto max-w-md px-20 py-10 rounded-lg overflow-hidden shadow-lg bg-white"
    >
      <div class="mb-10">
        <h1 class="flex justify-center">
          COVID-19 Journal
        </h1>
      </div>
      <router-view />
    </div>
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
