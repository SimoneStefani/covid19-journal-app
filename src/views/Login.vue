<template>
  <div class="min-h-screen flex flex-col justify-center container mx-auto px-4">
    <div class="flex flex-col items-center">
      <div class="flex flex-col justify-center items-center my-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4 font-serif">
          Covid-19 Tagebuch
        </h2>
        <login-img class="w-3/5 md:w-64 h-auto" />
      </div>

      <div v-if="registerMode" class="w-full md:w-2/3 lg:w-1/3">
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

      <div v-else class="w-full md:w-2/3 lg:w-1/3">
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

      <div class="flex-column justify-center align-center mt-10">
        <div class="flex justify-center align-center mt-5">
          <hr class="w-20" />
          <hr class="w-20" />
        </div>
        <div class="flex justify-center align-center mt-5">
          <a
            href="#"
            class="no-underline text-yellow-600"
            @click="registerMode = !registerMode"
            >{{ registerMode ? "Zum login" : "Registriere dich jetzt!" }}</a
          >
        </div>
      </div>
      <div class="flex justify-center align-center my-5">
        <facebook-button
          url="https://covid19journalapp.web.app"
          title="Du bist gefragt! Hilf im Kampf gegen das Coronavirus indem du Ärzten und Wissenschaftlern dabei hilfst das Virus besser zu verstehen. Fange jetzt ein Gesundheisttagebuch an und sorge selber dafür das du gesund bleibst. "
        />
        <twitter-button
          url="https://covid19journalapp.web.app"
          title="Deine Hilfe isgt gefragt! Hilf mit dieser App im Kampf gegen Corona."
        />
      </div>
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
