<template>
  <div class="min-h-screen flex flex-col">
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
        Hi Max! Here you can keep track of which days you submitted your health
        data.
      </h2>
      <div id="cal-heatmap" class="flex justify-center items-center"></div>
    </div>

    <div class="flex-1 flex flex-col container mx-auto px-4 my-6">
      <button
        @click="handleLogout"
        class="bg-gray-400 text-black font-bold py-2 px-4 mt-5 rounded w-full"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "Profile",

  data() {
    return {
      user: null
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },

  mounted() {
    var cal = new CalHeatMap();
    cal.init({
      start: new Date(2020, 2),
      data: {
        "1584524184": 1,
        "1584783384": 1
      },
      cellRadius: 20,
      domain: "month",
      range: 3,
      subDomain: "x_day",
      cellSize: 25,
      cellPadding: 5,
      verticalOrientation: true,
      displayLegend: false,
      highlight: ["now"],
      domainGutter: 10
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
