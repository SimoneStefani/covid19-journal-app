var dailyQuestions = new Map();

dailyQuestions.set("how_are_you_doing", {
  question: "Wie geht es dir heute?",
  type: "single-answer",
  next: null,
  answers: [
    {
      answer: "Mir geht es sehr gut :)",
      next: "thank_you",
      resolve: () => {}
    },
    {
      answer: "Nicht sehr gut :(",
      next: "breathing_problems_question",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("breathing_problems_question", {
  question: "Hast du Atembeschwerden?",
  type: "single-answer",
  answers: [
    {
      answer: "Ja, mir fällt das atmen schwerer.",
      next: "symptome_questions_1",
      resolve: report => {
        report.hasBreathingProblems = true;
      }
    },
    {
      answer: "Nein, zum Glück nicht.",
      next: "symptome_questions_1",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("symptome_questions_1", {
  question: "Hast du eines der folgenden Symptome?",
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
        report.hasHeadache = true;
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
  question: "Fühlst du dich schwach oder schlapp?",
  type: "single-answer",
  answers: [
    {
      answer: "Ja, leider. :(",
      next: "limb_pain_question",
      resolve: journal => {
        journal.feelsWeak = true;
      }
    },
    {
      answer: "Nein, ich bin fit.",
      next: "limb_pain_question",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("limb_pain_question", {
  question: "Ist dir ständig kalt oder hast du Gliederschmerzen?",
  type: "multiple-answers",
  answers: [
    {
      answer: "Gliederschmerzen",
      next: "further_symptoms_question",
      resolve: journal => {
        journal.hasLimbPain = true;
      }
    },
    {
      answer: "Kältegefühl oder Schüttelfrost",
      next: "further_symptoms_question",
      resolve: journal => {
        journal.hasChills = true;
      }
    },
    {
      answer: "Keines davon",
      next: "further_symptoms_question",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("further_symptoms_question", {
  question: "Hast du sonst noch Symptome oder Beschwerden?",
  type: "single-answer",
  answers: [
    {
      answer: "Ja, leider :(",
      next: "symptome_questions_2",
      resolve: () => {}
    },
    {
      answer: "Nein, zum Glück nicht.",
      next: "thank_you",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("symptome_questions_2", {
  question: "Welche der folgen Symptome treffen bei dir zu?",
  type: "multiple-answers",
  answers: [
    {
      answer: "Schnupfen",
      next: "thank_you",
      resolve: report => {
        report.hasSniff = true;
      }
    },
    {
      answer: "Halsschmerzen",
      next: "thank_you",
      resolve: report => {
        report.hasSoreThroat = true;
      }
    },
    {
      answer: "Durchfall",
      next: "thank_you",
      resolve: report => {
        report.hasDiarrhea = true;
      }
    },
    {
      answer: "Keines davon",
      next: "thank_you",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("thank_you", {
  type: "end",
  question:
    "Danke für deine Unterstützung! Zusammen besiegen wir das Coronavirus am schnellsten.",
  answers: []
});

export default dailyQuestions;
