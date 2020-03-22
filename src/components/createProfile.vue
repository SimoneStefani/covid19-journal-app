<template>
  <div>
    <div class="w-full flex justify-center">
      <welcome-img class="w-3/5 h-auto align-center" />
    </div>
    <h2 class="text-xl font-serif text-gray-800 mt-5 mb-3">
      Erzähle uns bitte kurz von dir.
    </h2>
    <p
      v-if="profileQuestions.get(first_question) == currentQuestion"
      class="my-5"
    >
      Um das Virus best möglichst zu verstehen würden wir dich gerne bitten kurz
      ein paar allgemeine Fragen zu dir und deinem Gesundheitlichem Hintergrund
      zu beantworten. Das hilft uns dabei die Krankheit besser zu verstehen um
      sie dadurch besser bekämpfen zu können.
    </p>
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

      <numeric-answer
        @next="
          answer => handleNumericAnswer(answer, currentQuestion.answers[0])
        "
        v-if="
          currentQuestion.answers[0] && currentQuestion.type == 'numeric-answer'
        "
        class="flex flex-wrap"
      />
    </div>
  </div>
</template>

<script>
import MultipleAnswers from "@/components/MultipleAnswers.vue";
import NumericAnswer from "@/components/NumericAnswer.vue";
import WelcomeImg from "@/components/WelcomeImg.vue";
import questions from "@/profileQuestions.js";

export default {
  name: "createProfile",

  components: {
    MultipleAnswers,
    NumericAnswer,
    WelcomeImg
  },

  props: {
    answers: {
      defualt: () => [],
      type: Array
    }
  },

  data() {
    return {
      today: new Date(),
      selected: [],
      first_question: "welcome",
      profileQuestions: questions,
      profile: {
        completedProfile: true,
        age: null,
        gender: "",
        isPregnant: false,
        isSmoker: false,
        livesAlone: false,
        hasLungDisease: false,
        hasDiabetes: false,
        hasHeartDisease: false,
        hasFlueVaccine: false,
        takesSteroids: false,
        takesImmunosuppressants: false,
        isObese: false
      },
      currentQuestion: undefined
    };
  },

  created() {
    this.currentQuestion = this.profileQuestions.get(this.first_question);
  },

  methods: {
    handleSubmit() {
      this.$emit("next", this.selected);
    },

    handleNumericAnswer(answer, answerable) {
      answerable.resolve(this.profile, answer);
      console.log("Age");
      console.log(this.profile.age);

      this.currentQuestion = this.profileQuestions.get(answerable.next);
    },

    handleAnswerSelected(answers) {
      answers.forEach(a => a.resolve(this.profile));
      this.currentQuestion = this.profileQuestions.get(answers[0].next);

      if (!this.currentQuestion.answers[0]) {
        console.log("EMIT: submit");
        console.log(this.profile);
        this.$emit("submit", this.profile);
      }
    },

    getFormattedDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    }
  }
};
</script>
