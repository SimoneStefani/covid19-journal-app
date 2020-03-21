<template>
  <div class="min-h-screen flex flex-col">
    <div class="px-3 py-2 flex justify-between items-baseline">
      <h2 class="text-xl font-bold text-gray-800">
        Covid-19 Journal
      </h2>
      <p @click="handleLogout" class="text-gray-600">Logout</p>
    </div>

    <div
      v-if="alreadyReported"
      class="flex-1 flex flex-col justify-center items-center container mx-auto px-4"
    >
      <done-img class="w-3/5 h-auto" />
      <p class="mt-6 text-center text-gray-800">
        Well done! <br />
        You have already made a report today.
      </p>
    </div>

    <div v-else class="flex-1 flex flex-col container mx-auto px-4 mt-24">
      <div class="w-full flex justify-center">
        <doctors-img class="w-3/5 h-auto align-center" />
      </div>
      <h2 class="text-xl font-serif text-gray-800 mt-5 mb-3">
        Journal entry for <span>{{ today.toDateString() }}</span
        >:
      </h2>
      <div>
        <h3 class="font-bold text-gray-900">
          {{ currentQuestion.question }}
        </h3>
        <div v-if="currentQuestion.answers[0]" class="flex flex-wrap">
          <button
            v-for="a in currentQuestion.answers"
            :key="a.answer"
            @click="handleAnswerSelected(a)"
            class="bg-orange-300 px-2 py-1 my-1 mx-2 rounded shadow text-yellow-900"
          >
            {{ a.answer }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { addJournalEntry } from "@/firebase.js";
import DoneImg from "@/components/DoneImg.vue";
import DoctorsImg from "@/components/DoctorsImg.vue";
import quest from "@/dailyQuestions.js";

export default {
  name: "Home",

  components: {
    DoneImg,
    DoctorsImg
  },

  data() {
    return {
      alreadyReported: true,
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
