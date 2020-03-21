<template>
  <div class="flex justify-center align-center">
    <div class="flex-column">
      <div v-if="registerMode">
        <label class="block mb-5">
          <span class="text-gray-700">Name</span>
          <input
            class="form-input mt-1 block w-full"
            v-model="register.name"
            placeholder="Name"
          />
        </label>

        <label class="block mb-5">
          <span class="text-gray-700">Email</span>
          <input
            class="form-input mt-1 block w-full"
            v-model="register.email"
            placeholder="Email"
          />
        </label>

        <label class="block mb-5">
          <span class="text-gray-700">Passwort</span>
          <input
            class="form-input mt-1 block w-full"
            v-model="register.password"
            placeholder="Passwort"
            v-on:keyup.enter="handleRegister"
          />
        </label>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="handleRegister"
        >
          Registrieren
        </button>
      </div>

      <div v-else>
        <label class="block mb-5">
          <span class="text-gray-700">Email</span>
          <input
            class="form-input mt-1 block w-full"
            v-model="login.email"
            placeholder="Email"
          />
        </label>

        <label class="block mb-5">
          <span class="text-gray-700">Passwort</span>
          <input
            class="form-input mt-1 block w-full"
            v-model="login.password"
            type="password"
            placeholder="Passwort"
            v-on:keyup.enter="handleLogin"
          />
        </label>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="handleLogin"
        >
          Login
        </button>
      </div>

      <div class="flex justify-center mt-10">
        <a
          href="#"
          class="no-underline text-blue-500"
          @click="registerMode = !registerMode"
          >{{ registerMode ? "Zum login" : "Registriere dich jetzt!" }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { createUser } from "@/firebase.js";

export default {
  name: "Login",

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
