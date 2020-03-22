<template>
  <div
    class="w-fill xl:w-1/4 lg:w-1/3 md:w-1/3 flex-fill justify-center container mx-auto px-4"
  >
    <div class="px-3 py-2 flex justify-between items-baseline">
      <h2 class="text-xl font-bold text-gray-800">
        Covid-19 Tagebuch
      </h2>
      <p @click="() => $router.push({ name: 'Profile' })" class="text-gray-600">
        Profile
      </p>
    </div>

    <div
      v-if="completedProfile && alreadyReported"
      class="flex-1 flex flex-col justify-center items-center container mx-auto px-4"
    >
      <done-img class="w-3/5 md:w-64 h-auto" />
      <p class="mt-6 text-gray-800">
        Du hast deinen heutigen Beitrag geleistet. Vielen Dank! <br /><br />
        Mit deiner Hilfe bekämpfen wir das Coronavirus. <br />

        Ärzte und Wissenschaftler können dank Menschen wie dir mehr über das
        Virus lernen und es somit schneller besiegen. Jeder Beitrag zählt.

        <br /><br />
        Teile diese App mit deinen Freunden.
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
      v-if="!alreadyReported && completedProfile"
      class="flex-1 flex flex-col container mx-auto px-4 mt-24"
    >
      <daily-journal @submit="entry => handleSubmitDailyJournal(entry)" />
    </div>
    <div class="flex justify-center align-center mt-5">
      <facebook-button
        url="https://covid19journalapp.web.app"
        title="Du bist gefragt! Hilf im Kampf gegen das Coronavirus indem du Ärzten und Wissenschaftlern dabei hilfst das Virus besser zu verstehen. Fange jetzt ein Gesundheisttagebuch an und sorge selber dafür das du gesund bleibst. "
      />
      <twitter-button
        url="https://covid19journalapp.web.app"
        title="Deine Hilfe isgt gefragt! Hilf mit dieser App im Kampf gegen Corona."
      />
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
import TwitterButton from "vue-share-buttons/src/components/TwitterButton";
import FacebookButton from "vue-share-buttons/src/components/FacebookButton";

export default {
  name: "Home",

  components: {
    DoneImg,
    createProfile,
    DailyJournal,
    TwitterButton,
    FacebookButton
  },

  data() {
    return {
      profile: null,
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
        this.profile = userProfile;
        this.completedProfile = userProfile.completedProfile;
      });
      if (user) hasSubmitted().then(res => (this.alreadyReported = res));
    });
  },

  methods: {
    handleSubmitDailyJournal(entry) {
      addJournalEntry(entry);
      this.$router.go();
    },

    handleSubmitProfile(entry) {
      updateProfile({
        ...this.profile,
        ...entry
      });
      this.completedProfile = true;
      this.$router.go();
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
