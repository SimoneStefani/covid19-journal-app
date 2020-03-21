var dailyQuestions = new Map();

dailyQuestions.set("how_are_you_doing", {
  question: "Wie geht es dir heute?",
  answers: [
    {
      answer: "Mir geht es sehr gut :)",
      next: "doing_fine",
      resolve: () => {}
    },
    {
      answer: "Nicht sehr gut :(",
      next: "not_doing_fine",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("doing_fine", {
  question:
    "Super! Hab einen schönen Tag. Schaue doch bitte morgen nochmal bei mir vorbei.",
  answers: []
});

dailyQuestions.set("not_doing_fine", {
  question:
    "Oh, das ist schade. \n Geht es dir einfsch nicht gut oder hast du sogar richtige Symptome?",
  answers: [
    {
      answer: "Ich habe Symptome",
      next: "has_clear_symptoms",
      resolve: () => {}
    },
    {
      answer: "Mir geht es einfach nicht so gut.",
      next: "mild_symptoms",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("has_clear_symptoms", {
  question: "Hast du eines der folgenden Symptome?",
  answers: [
    {
      answer: "Atemprobleme",
      next: "symptoms_reported",
      resolve: report => (report.hasBreathingProblems = true)
    },
    {
      answer: "Keines davon",
      next: "symptoms_reported",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("mild_symptoms", {
  question: "Spührst du eines der folgenden symptome?",
  answers: [
    {
      answer: "Allgemeine schwäche",
      next: "symptoms_reported",
      resolve: report => (report.feelsWeak = true)
    },
    {
      answer: "Keines davon.",
      next: "symptoms_reported",
      resolve: report => (report.feelsWeak = false)
    }
  ]
});

dailyQuestions.set("symptoms_reported", {
  question:
    "Danke, dass du uns dabei hilfst dir zu helfen. Zusammen können wir das Coronavirus am besten bekäpfen.",
  answers: []
});

export default dailyQuestions;
