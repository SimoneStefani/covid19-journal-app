<template>
  <div class="min-h-screen flex flex-col justify-center container mx-auto px-4">
    <div class="flex-column">
      <div class="flex flex-col justify-center items-center my-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4 font-serif">
          Covid-19 Tagebuch
        </h2>
        <login-img class="w-3/5 h-auto" />
      </div>

      <div v-if="registerMode">
        <h3 class="mt-5 mb-2">
          <i>Create an account to track bla bla bla</i>
        </h3>
        <label class="block mb-5">
          <input
            class="form-input mt-1 block w-full"
            v-model="register.name"
            placeholder="Name"
          />
        </label>

        <label class="block mb-5">
          <input
            class="form-input mt-1 block w-full"
            v-model="register.email"
            placeholder="Email"
          />
        </label>

        <label class="block mb-5">
          <input
            class="form-input mt-1 block w-full"
            v-model="register.password"
            placeholder="Passwort"
            v-on:keyup.enter="handleRegister"
          />
        </label>
        <button
          class="bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
          @click="handleRegister"
        >
          Registrieren
        </button>
      </div>

      <div v-else>
        <h3 class="mt-6 mb-3">
          <i>Login to track bla bla bla</i>
        </h3>
        <label class="block mb-5">
          <input
            class="form-input mt-1 block w-full"
            v-model="login.email"
            placeholder="Email"
          />
        </label>

        <label class="block mb-5">
          <input
            class="form-input mt-1 block w-full"
            v-model="login.password"
            type="password"
            placeholder="Passwort"
            v-on:keyup.enter="handleLogin"
          />
        </label>
        <button
          class="bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
          @click="handleLogin"
        >
          Login
        </button>
      </div>

      <div class="flex justify-center mt-10">
        <a
          href="#"
          class="no-underline text-yellow-600"
          @click="registerMode = !registerMode"
          >{{ registerMode ? "Zum login" : "Registriere dich jetzt!" }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import LoginImg from "@/components/LoginImg.vue";
import firebase, { createUser } from "@/firebase.js";

export default {
  name: "Login",

  components: {
    LoginImg
  },

  data() {
    return {
      registerMode: false,
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
        .then(({ user }) => createUser(user.uid))
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
