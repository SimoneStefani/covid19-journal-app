var dailyQuestions = new Map();

dailyQuestions.set("how_are_you_doing", {
  question: "Wie geht es dir heute?",
  type: "single-answer",
  next: null,
  answers: [
    {
      answer: "Mir geht es sehr gut :)",
      next: "doing_fine",
      resolve: () => {}
    },
    {
      answer: "Nicht sehr gut :(",
      next: "not_doing_fine_1",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("not_doing_fine_1", {
  question: "Oh, das ist schade. Hast du eines der folgenden Symptome?",
  type: "multiple-answers",
  answers: [
    {
      answer: "Ich habe Husten",
      next: "not_doing_fine_2",
      resolve: report => {
        report.hasCough = true;
      }
    },
    {
      answer: "Ich habe Fieber",
      next: "not_doing_fine_2",
      resolve: report => {
        report.hasFever = true;
      }
    },
    {
      answer: "Ich habe Kopfschmerzen",
      next: "not_doing_fine_2",
      resolve: report => {
        report.hasHeadAche = true;
      }
    },
    {
      answer: "Keines davon",
      next: "not_doing_fine_2",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("not_doing_fine_2", {
  question:
    "Leidest du unter chronischen Krankheiten? (Diabetes, Herzkrankheite etc.)",
  type: "single-answer",
  answers: [
    {
      answer: "Ja, ich leider unter chronischen Krankhenheiten.",
      next: "doing_fine",
      resolve: () => {}
    },
    {
      answer: "Nein, ich bin sonst gesund.",
      next: "doing_fine",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("doing_fine", {
  type: "end",
  question:
    "Super! Hab einen schönen Tag. Schaue doch bitte morgen nochmal bei mir vorbei.",
  answers: []
});

export default dailyQuestions;
