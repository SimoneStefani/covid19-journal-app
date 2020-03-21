<template>
  <div>
    <h2 v-if="!user">Nobody is authenticated</h2>
    <h2 v-else>Welcome {{ user.email }}</h2>
    <h3>
      Today is:
      {{ today.getDate() + "." + today.getMonth() + "." + today.getFullYear() }}
    </h3>

    <div>
      <p>{{ questions[currentQuestionIndex].q }}</p>
      <input v-model="questions[currentQuestionIndex].a" />
      <p>Answer: {{ questions[currentQuestionIndex].a }}</p>
    </div>
    <button v-if="currentQuestionIndex > 0" @click="currentQuestionIndex--">
      Previous
    </button>
    <button
      v-if="currentQuestionIndex < questions.length - 1"
      @click="currentQuestionIndex++"
    >
      Next
    </button>
    <div v-else>
      <button @click="handleSubmit">Submit</button>
    </div>

    <div v-if="user" style="margin-top: 50px">
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import firebase, { addJournalEntry } from "@/firebase.js";

export default {
  name: "Home",

  data() {
    return {
      user: null,
      today: new Date(),
      questions: [
        { q: "Are you feeling sick?", a: undefined },
        { q: "Do you have a fever?", a: undefined },
        { q: "Do you have trouble breathing?", a: undefined }
      ],
      currentQuestionIndex: 0
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => (this.user = user));
  },

  methods: {
    handleSubmit() {
      addJournalEntry(this.questions);
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
