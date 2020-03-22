<template>
  <div>
    <button
      v-for="a in answers"
      :key="a.answer"
      @click="toggleAnswer(a)"
      class="px-2 py-1 my-1 mx-2 rounded shadow text-yellow-900"
      :class="isSelected(a) ? 'bg-orange-500' : 'bg-orange-300'"
    >
      {{ a.answer }}
    </button>

    <button
      class="bg-gray-400 text-black font-bold py-2 px-4 mt-5 rounded w-full"
      @click="handleSubmit"
    >
      Weiter
    </button>
  </div>
</template>

<script>
export default {
  name: "MultipleAnswers",

  props: {
    answers: {
      defualt: () => [],
      type: Array
    }
  },

  data() {
    return {
      selected: []
    };
  },

  methods: {
    handleSubmit() {
      this.$emit("next", this.selected);
    },

    toggleAnswer(ans) {
      var inArray = this.isSelected(ans);

      if (inArray) {
        this.selected = this.selected.filter(a => a.answer != ans.answer);
      } else {
        this.selected = [...this.selected, ans];
      }
    },

    isSelected(ans) {
      return this.selected.some(a => a.answer == ans.answer);
    }
  }
};
</script>
