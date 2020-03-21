<template>
  <div>
    <h2 v-if="!user">Nobody is authenticated</h2>
    <h2 v-else>Welcome {{ user.email }}</h2>
    <h3>
      Today is:
      {{ today.getDate() + "." + today.getMonth() + "." + today.getFullYear() }}
    </h3>

    <h3>{{ currentQuestion.question }}</h3>
    <div v-if="currentQuestion.answers[0]">
      <button
        v-for="a in currentQuestion.answers"
        :key="a.answer"
        @click="handleAnswerSelected(a)"
      >
        {{ a.answer }}
      </button>
    </div>

    <div v-if="user" style="margin-top: 50px">
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import firebase, { addJournalEntry } from "@/firebase.js";
import quest from "@/dailyQuestions.js";

export default {
  name: "Home",

  data() {
    return {
      user: null,
      today: new Date(),
      dq: quest,
      journalEntry: {
        // location: undefined,
        hasCough: false,
        hasFever: false,
        hasChills: false,
        feelsWeak: false,
        hasLimbPain: false,
        hasSniff: false,
        hasDiarrhea: false,
        hasSoreThroat: false,
        hasHeadache: false,
        hasBreathingProblems: false
      },
      currentQuestion: undefined
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => (this.user = user));
    this.currentQuestion = this.dq.get("how_are_you_doing");
  },

  methods: {
    handleAnswerSelected(answer) {
      answer.resolve(this.journalEntry);
      this.currentQuestion = this.dq.get(answer.next);

      if (!this.currentQuestion.answers[0]) {
        addJournalEntry(this.journalEntry);
      }
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
