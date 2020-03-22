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
      class="bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
      @click="handleSubmit"
    >
      Weiter
    </button>
  </div>
</template>

<script>
export default {
  name: "NumericAnswer",

  props: {
    question: {
      default: "",
      type: String
    }
  },

  data() {
    return {
      answer: null
    };
  },

  methods: {
    handleSubmit() {
      this.$emit("next", parseInt(this.answer));
    }
  }
};
</script>
