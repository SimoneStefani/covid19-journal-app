<template>
  <div class="home">
    <h2 v-if="!user">Nobody is authenticated</h2>
    <h2 v-else>I am {{ user.email }}</h2>

    <h3>Home page</h3>

    <div v-if="user">
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "Home",

  data() {
    return {
      user: null
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => (this.user = user));
  },

  methods: {
    handleLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Logout successful"))
        .catch(err => console.error(err));
    }
  }
};
</script>
