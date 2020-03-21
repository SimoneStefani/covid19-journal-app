var initialQuestions = new Map();

initialQuestions.set("gender_question", {
  question: "Kannst du uns bitte dein Geschlecht mitteilen.",
  answers: [
    {
      answer: "Weiblich",
      next: "age_question",
      resolve: profile => (profile.gender = "male")
    },
    {
      answer: "Männlich",
      next: "age_question",
      resolve: profile => (profile.livesAlone = "female")
    }
  ]
});

initialQuestions.set("age_question", {
  question: "Würdest du bitte dein Alter mit uns teilen?",
  answers: [
    {
      answer: "unter 18",
      next: "living_condition_question",
      resolve: profile => (profile.age = "unter 18")
    },
    {
      answer: "19-30",
      next: "living_condition_question",
      resolve: profile => (profile.age = "19-30")
    },
    {
      answer: "31-50",
      next: "living_condition_question",
      resolve: profile => (profile.age = "31-50")
    },
    {
      answer: "51-70",
      next: "living_condition_question",
      resolve: profile => (profile.age = "51-70")
    },
    {
      answer: "71-90",
      next: "living_condition_question",
      resolve: profile => (profile.age = "71-90")
    },
    {
      answer: "Ich will mein Alter nicht verraten",
      next: "living_condition_question",
      resolve: profile => (profile.age = null)
    }
  ]
});

initialQuestions.set("living_condition_question", {
  question: "Wohnst du zur Zeit alleine?",
  answers: [
    {
      answer: "Ja, ich wohne alleine.",
      next: "pregnancy_question",
      resolve: profile => (profile.livesAlone = true)
    },
    {
      answer: "Nein, ich wohne mit anderen.",
      next: "pregnancy_question",
      resolve: profile => (profile.livesAlone = false)
    }
  ]
});

initialQuestions.set("pregnancy_question", {
  question: "Bist du schwanger?",
  answers: [
    {
      answer: "Ja, ich bin schwanger :)",
      next: "smoking_question",
      resolve: profile => (profile.isPregnant = true)
    },
    {
      answer: "Nein.",
      next: "smoking_question",
      resolve: profile => (profile.isPregnant = false)
    }
  ]
});

initialQuestions.set("smoking_question", {
  question: "Und wie sieht es mit dem rauchen aus?",
  answers: [
    {
      answer: "Ich bin Raucher/in",
      next: "chronic_disease_questions",
      resolve: profile => (profile.isSmoker = true)
    },
    {
      answer: "Nein, ich rauche nicht!",
      next: "chronic_disease_questions",
      resolve: profile => (profile.isSmoker = false)
    }
  ]
});

initialQuestions.set("chronic_disease_questions", {
  question: "Leidest du unter chronische Krankheiten? (Diabetes, Krebs, etc.",
  answers: [
    {
      answer: "Ja, ich bin krank :(",
      next: "smoking_question",
      resolve: profile => (profile.isSmoker = true)
    },
    {
      answer: "Nein, ich bin gesund :)",
      next: "questions_completed",
      resolve: profile => (profile.isSmoker = false)
    }
  ]
});

initialQuestions.set("questions_completed", {
  question:
    "Danke, dass du uns dabei hilfst dir zu helfen. Zusammen können wir das Coronavirus am besten bekäpfen.",
  answers: []
});

export default initialQuestions;
