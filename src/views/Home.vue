<template>
  <div class="min-h-screen flex flex-col">
    <div class="px-3 py-2 flex justify-between items-baseline">
      <h2 class="text-xl font-bold text-gray-800">
        Covid-19 Tagebuch
      </h2>
      <p @click="handleLogout" class="text-gray-600">Logout</p>
    </div>

    <div
      v-if="completedProfile && alreadyReported"
      class="flex-1 flex flex-col justify-center items-center container mx-auto px-4"
    >
      <done-img class="w-3/5 h-auto" />
      <p class="mt-6 text-center text-gray-800">
        Du hast deinen heutigen Beitrag geleistet. Vielen Dank! <br /><br />
        Mit deiner Hilfe bekämpfen wir das Coronavirus. <br />

        Ärzte und Wissenschaftler können dank Menschen wie dir mehr über das
        Virus lernen und es somit schneller besiegen. Jeder Beitrag zählt.

        <br /><br />
        Teile diese App mit deinen Freunden aus Facebook
        <br />
      </p>
    </div>

    <div
      v-if="!completedProfile"
      class="flex-1 flex flex-col justify-center items-center container mx-auto px-4"
    >
      <create-profile @submit="entry => handleSubmitProfile(entry)" />
    </div>

    <div
      v-if="!alreadyReported"
      class="flex-1 flex flex-col container mx-auto px-4 mt-24"
    >
      <daily-journal @submit="entry => handleSubmitDailyJournal(entry)" />
    </div>
  </div>
</template>

<script>
import firebase, {
  addJournalEntry,
  hasSubmitted,
  updateProfile,
  getProfile
} from "@/firebase.js";
import DoneImg from "@/components/DoneImg.vue";
import createProfile from "@/components/createProfile.vue";
import DailyJournal from "@/components/DailyJournal.vue";

export default {
  name: "Home",

  components: {
    DoneImg,
    createProfile,
    DailyJournal
  },

  data() {
    return {
      completedProfile: false,
      alreadyReported: false,
      user: null,
      today: new Date(),
      currentQuestion: undefined
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      getProfile().then(userProfile => {
        this.completedProfile = userProfile.completedProfile;
      });
      if (user) hasSubmitted().then(res => (this.alreadyReported = res));
    });
  },

  methods: {
    handleSubmitDailyJournal(entry) {
      addJournalEntry(entry);
    },

    handleSubmitProfile(entry) {
      updateProfile(entry);
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
