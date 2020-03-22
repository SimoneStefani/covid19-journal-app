<template>
  <div
    class="w-fill xl:w-1/4 lg:w-1/3 md:w-1/3 flex-fill justify-center container mx-auto px-4"
  >
    <div class="my-8">
      <h2 class="text-center text-3xl font-bold text-gray-800 mb-4 font-serif">
        Covid-19 Tagebuch
      </h2>
      <login-img class="mx-auto w-3/5 md:w-64 h-auto" />
    </div>

    <div v-if="registerMode" class=" ">
      <h3 class="mt-5 mb-2">
        <p>Erstelle deinen Account</p>
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
          type="password"
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
        <p>
          <b>Jeder Beitrag zählt!</b>
          <br />Mit deiner Hilfe besiegen wir das Coronavirus!
        </p>
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

    <div class="flex-column justify-center my-5">
      <div class="flex justify-center">
        <hr class="w-1/2" />
      </div>
      <a
        href="#"
        class="flex justify-center no-underline text-yellow-600 my-5"
        @click="registerMode = !registerMode"
        >{{ registerMode ? "Zum login" : "Registriere dich jetzt!" }}</a
      >
    </div>
    <div class="flex justify-center my-5">
      <facebook-button url="https://covid19journalapp.web.app" />
      <twitter-button url="https://covid19journalapp.web.app" />
    </div>
  </div>
</template>

<script>
import LoginImg from "@/components/LoginImg.vue";
import firebase, { createUser } from "@/firebase.js";
import TwitterButton from "vue-share-buttons/src/components/TwitterButton";
import FacebookButton from "vue-share-buttons/src/components/FacebookButton";

export default {
  name: "Login",

  components: {
    LoginImg,
    TwitterButton,
    FacebookButton
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
        .then(({ user }) => createUser(user.uid, this.register.name))
        .then(() => this.$router.push({ name: "Home" }))
        .catch(err => console.error(err));
    },

    handleLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login.email, this.login.password)
        .then(() => this.$router.push({ name: "Home" }))
        .catch(err => console.error(err));
    }
  }
};
</script>
