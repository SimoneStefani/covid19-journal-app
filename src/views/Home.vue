<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2 v-if="!user">Nobody is authenticated</h2>
    <h2 v-else>I am {{ user.email }}</h2>

    <h3>Register</h3>
    <input v-model="register.name" placeholder="name" />
    <input v-model="register.email" placeholder="email" />
    <input v-model="register.password" placeholder="password" type="password" />
    <button @click="handleRegister">Register</button>

    <hr />

    <h3>Login</h3>
    <input v-model="login.email" placeholder="email" />
    <input v-model="login.password" placeholder="password" type="password" />
    <button @click="handleLogin">Login</button>

    <hr />

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
      register: {
        name: "",
        email: "",
        password: ""
      },

      login: {
        email: "",
        password: ""
      },

      user: null
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => (this.user = user));
  },

  methods: {
    handleRegister() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.register.email,
          this.register.password
        )
        .catch(err => console.error(err));
    },

    handleLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login.email, this.login.password)
        .catch(err => console.error(err));
    },

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
