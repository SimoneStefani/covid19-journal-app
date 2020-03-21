<template>
  <div class="home">
    <h2 v-if="!user">Nobody is authenticated</h2>
    <h2 v-else>Welcome {{ user.email }}</h2>

    <div>
      <p>{{question_list[current_quuestion_index]}}</p>
      <input v-model="answer_list[current_quuestion_index]" />
      <p>Answer: {{ answer_list[current_quuestion_index]}}</p>
    </div>
    <button v-if="current_quuestion_index > 0" @click="current_quuestion_index--">Previous</button>
    <button
      v-if="current_quuestion_index < question_list.length - 1"
      @click="current_quuestion_index++"
    >Next</button>

    <div v-if="user" style="margin-top: 50px">
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
      user: null,
      question_list: [
        "Are you feeling sick?",
        "Do you have a fever?",
        "Do you have trouble breathing?"
      ],
      answer_list: [],
      current_quuestion_index: 0
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
