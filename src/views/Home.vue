<template>
  <div class="home">
    <h2 v-if="!user">Nobody is authenticated</h2>
    <h2 v-else>Welcome {{ user.email }}</h2>
    <h3>Today is: {{ today.getDate() + '.' + today.getMonth() + '.' + today.getFullYear() }}</h3>

    <div>
      <p>{{question_list[current_question_index]}}</p>
      <input v-model="answer_list[current_question_index]" />
      <p>Answer: {{ answer_list[current_question_index]}}</p>
    </div>
    <button v-if="current_question_index > 0" @click="current_question_index--">Previous</button>
    <button
      v-if="current_question_index < question_list.length - 1"
      @click="current_question_index++"
    >Next</button>
    <div v-else>
      <button @click="handleSubmit">Submit</button>
    </div>

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
      today: new Date(),
      question_list: [
        "Are you feeling sick?",
        "Do you have a fever?",
        "Do you have trouble breathing?"
      ],
      answer_list: [],
      current_question_index: 0
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => (this.user = user));
  },

  methods: {
    handleSubmit() {
      this.question_list.forEach((element, i) => {
        console.log(element);
        console.log(this.answer_list[i] + "\n");
      });
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
