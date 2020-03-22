<template>
  <div>
    <label class="block mb-5">
      <input
        class="form-input mt-1 block w-full"
        v-model="answer"
        type="number"
        placeholder="Alter"
        v-on:keyup.enter="handleSubmit"
      />
    </label>
    <button
      class="font-bold py-2 px-4 rounded w-full"
      :class="
        !(answer && answer > 0)
          ? 'bg-gray-200 text-gray-400 cursor-default'
          : 'bg-yellow-600 text-white '
      "
      :disabled="!(answer && parseInt(answer) > 0)"
      @click="handleSubmit"
    >
      Weiter
    </button>
  </div>
</template>

<script>
export default {
  name: "NumericAnswer",

  data() {
    return {
      answer: null
    };
  },

  methods: {
    handleSubmit() {
      if (this.answer && this.answer > 0) {
        this.$emit("next", parseInt(this.answer));
      }
    }
  }
};
</script>
