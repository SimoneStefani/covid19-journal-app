<template>
  <div>
    <div class="w-full flex justify-center">
      <doctors-img class="w-3/5 h-auto align-center" />
    </div>
    <h2 class="text-xl font-serif text-gray-800 mt-5 mb-3">
      Tagebucheintrag für

      <span>{{
        today.toLocaleDateString("de-DE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      }}</span
      >:
    </h2>
    <div>
      <h3 class="font-bold text-gray-900">
        {{ currentQuestion.question }}
      </h3>
      <div
        v-if="
          currentQuestion.answers[0] &&
            (currentQuestion.type == 'single-answer' ||
              currentQuestion.type == 'end')
        "
        class="flex flex-wrap"
      >
        <button
          v-for="a in currentQuestion.answers"
          :key="a.answer"
          @click="handleAnswerSelected([a])"
          class="bg-orange-300 px-2 py-1 my-1 mx-2 rounded shadow text-yellow-900"
        >
          {{ a.answer }}
        </button>
      </div>

      <multiple-answers
        @next="answers => handleAnswerSelected(answers)"
        :answers="currentQuestion.answers"
        v-if="
          currentQuestion.answers[0] &&
            currentQuestion.type == 'multiple-answers'
        "
        class="flex flex-wrap"
      />
    </div>
  </div>
</template>

<script>
import MultipleAnswers from "@/components/MultipleAnswers.vue";
import DoctorsImg from "@/components/DoctorsImg.vue";
import quest from "@/dailyQuestions.js";

export default {
  name: "DailyJournal",

  components: {
    MultipleAnswers,
    DoctorsImg
  },

  data() {
    return {
      today: new Date(),
      selected: [],
      dailyQuestions: quest,
      location: null,
      journalEntry: {
        date: this.getFormattedDate(),
        longitude: null,
        latitude: null,
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
    this.currentQuestion = this.dailyQuestions.get("how_are_you_doing");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => (this.location = coords),
      err => console.log(err)
    );
  },

  methods: {
    handleAnswerSelected(answers) {
      answers.forEach(a => a.resolve(this.journalEntry));
      this.currentQuestion = this.dailyQuestions.get(answers[0].next);

      if (!this.currentQuestion.answers[0]) {
        if (this.location) {
          this.journalEntry["longitude"] = this.location.longitude;
          this.journalEntry["latitude"] = this.location.latitude;
        }

        this.$emit("submit", this.journalEntry);
      }
    },

    getFormattedDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    }
  }
};
</script>
