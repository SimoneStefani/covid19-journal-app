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
      next: "symptome_questions_1",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("symptome_questions_1", {
  question: "Oh, das ist schade. Hast du eines der folgenden Symptome?",
  type: "multiple-answers",
  answers: [
    {
      answer: "Ich habe Husten",
      next: "weakness_question",
      resolve: report => {
        report.hasCough = true;
      }
    },
    {
      answer: "Ich habe Fieber",
      next: "weakness_question",
      resolve: report => {
        report.hasFever = true;
      }
    },
    {
      answer: "Ich habe Kopfschmerzen",
      next: "weakness_question",
      resolve: report => {
        report.hasHeadAche = true;
      }
    },
    {
      answer: "Keines davon",
      next: "weakness_question",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("weakness_question", {
  question: "Fühlst du dich schwach und/oder schlapp?",
  type: "single-answer",
  answers: [
    {
      answer: "Ja, leider. :(",
      next: "doing_fine",
      resolve: journal => {
        journal.feelsWeak = true;
      }
    },
    {
      answer: "Nein, ich bin fit.",
      next: "doing_fine",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("doing_fine", {
  type: "end",
  question:
    "Danke für deine Zeit! Hab einen schönen Tag und schaue doch bitte morgen nochmal bei mir vorbei.",
  answers: []
});

export default dailyQuestions;
