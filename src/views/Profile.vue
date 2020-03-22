<template>
  <div
    class="w-fill xl:w-1/4 lg:w-1/3 md:w-1/3 flex-fill justify-center container mx-auto px-4"
  >
    <div class="px-3 py-2 flex justify-between items-baseline">
      <h2 class="text-xl font-bold text-gray-800">
        Covid-19 Tagebuch
      </h2>
      <p @click="() => $router.push({ name: 'Home' })" class="text-gray-600">
        Back
      </p>
    </div>

    <div class="flex-1 flex flex-col container mx-auto px-4">
      <h2 class="text-xl font-serif text-gray-800 mt-5 mb-3">
        Hallo {{ profile ? profile.name : "" }}! <br /><br />
        Hier siehst du an welchen Tagen du ins Tagebuch geschrieben hast.
      </h2>
      <div id="cal-heatmap" class="flex justify-center items-center m-2"></div>
    </div>

    <div class="flex-1 flex flex-col items-center container mx-auto px-4 my-6">
      <div class="w-full md:w-2/3 lg:w-1/3">
        <button
          @click="handleLogout"
          class="bg-gray-400 text-black font-bold py-2 px-4 mt-5 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { getJournal, getProfile } from "@/firebase.js";

export default {
  name: "Profile",

  data() {
    return {
      profile: null
    };
  },

  mounted() {
    getProfile().then(userProfile => {
      this.profile = userProfile;
      console.log(userProfile);
    });
    firebase.auth().onAuthStateChanged(() => {
      getJournal().then(journal => {
        Object.keys(journal).forEach(k => (this.heatmapData[k] = 1));

        var cal = new CalHeatMap();
        cal.init({
          start: new Date(2020, 2),
          data: this.heatmapData,
          cellRadius: 20,
          domain: "month",
          range: 2,
          subDomain: "x_day",
          cellSize: 25,
          cellPadding: 5,
          verticalOrientation: true,
          displayLegend: false,
          highlight: ["now"],
          domainGutter: 10
        });
      });
    });
  },

  methods: {
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
