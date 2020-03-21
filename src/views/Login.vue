<template>
  <div class="home">
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
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "Login",

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
      }
    };
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
    }
  }
};
</script>
