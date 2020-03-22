var profileQuestions = new Map();

profileQuestions.set("welcome", {
  question: "Bist du bereit?",
  type: "single-answer",
  answers: [
    {
      answer: "Ja, lass uns loslegen :)",
      next: "age_question",
      resolve: () => {}
    }
  ]
});

profileQuestions.set("age_question", {
  question: "Wie alt bist du?",
  type: "numeric-answer",
  answers: [
    {
      next: "gender_question",
      resolve: (profile, value) => (profile.age = value)
    }
  ]
});

profileQuestions.set("gender_question", {
  question: "Ich bin:",
  type: "single-answer",
  answers: [
    {
      answer: "Weiblich",
      next: "living_condition_question",
      resolve: (profile, value = "female") => (profile.gender = value)
    },
    {
      answer: "Männlich",
      next: "living_condition_question",
      resolve: (profile, value = "male") => (profile.gender = value)
    }
  ]
});

profileQuestions.set("living_condition_question", {
  question: "Wohnst du zur Zeit alleine?",
  type: "single-answer",
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

profileQuestions.set("pregnancy_question", {
  question: "Bist du schwanger?",
  type: "single-answer",
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

profileQuestions.set("smoking_question", {
  question: "Und wie sieht es mit dem rauchen aus?",
  type: "single-answer",
  answers: [
    {
      answer: "Ich bin Raucher/in",
      next: "has_chronic_disease_questions",
      resolve: profile => (profile.isSmoker = true)
    },
    {
      answer: "Nein, ich rauche nicht!",
      next: "has_chronic_disease_questions",
      resolve: profile => (profile.isSmoker = false)
    }
  ]
});

profileQuestions.set("has_chronic_disease_questions", {
  question: "Leidest du unter chronische Krankheiten? (Diabetes, Krebs, etc.)",
  type: "single-answer",
  answers: [
    {
      answer: "Ja, ich bin krank :(",
      next: "chronic_disease_questions",
      resolve: () => {}
    },
    {
      answer: "Nein, ich bin sonst gesund :)",
      next: "flue_vaccine_question",
      resolve: () => {}
    }
  ]
});

profileQuestions.set("chronic_disease_questions", {
  question: "Unter welchen dieser Krankheiten leidest du?",
  type: "multiple-answers",
  answers: [
    {
      answer: "Lungenkrankheit",
      next: "flue_vaccine_question",
      resolve: report => {
        report.hasLungDisease = true;
      }
    },
    {
      answer: "Diabetes",
      next: "flue_vaccine_question",
      resolve: report => {
        report.hasDiabetes = true;
      }
    },
    {
      answer: "Herzkrankheit",
      next: "flue_vaccine_question",
      resolve: report => {
        report.hasHeartDisease = true;
      }
    },
    {
      answer: "Keines davon",
      next: "flue_vaccine_question",
      resolve: () => {}
    }
  ]
});

profileQuestions.set("flue_vaccine_question", {
  question: "Hast du schon die diesjährige Grippeimpfung?",
  type: "single-answer",
  answers: [
    {
      answer: "Ja, ich habe mich geimpft.",
      next: "medicine_question",
      resolve: profile => {
        profile.hasFlueVaccine = true;
      }
    },
    {
      answer: "Nein.",
      next: "medicine_question",
      resolve: profile => {
        profile.hasFlueVaccine = false;
      }
    }
  ]
});

profileQuestions.set("medicine_question", {
  question: "Nimmst du eines der folgenenden Mittel zu dir?",
  type: "multiple-answers",
  answers: [
    {
      answer: "Steroide",
      next: "obesity_question",
      resolve: profile => {
        profile.takesSteroids = true;
      }
    },
    {
      answer: "Immunsuppressiva",
      next: "obesity_question",
      resolve: profile => {
        profile.takesImmunosuppressants = true;
      }
    },
    {
      answer: "Nein, keines davon.",
      next: "obesity_question",
      resolve: () => {}
    }
  ]
});

profileQuestions.set("obesity_question", {
  question: "Bist du übergewichtig?",
  type: "single-answer",
  answers: [
    {
      answer: "Ja",
      next: "thank_you",
      resolve: profile => {
        profile.isObese = true;
      }
    },
    {
      answer: "Nein",
      next: "thank_you",
      resolve: profile => {
        profile.isObese = false;
      }
    }
  ]
});

profileQuestions.set("thank_you", {
  question: "Danke, das wars. Dein Profil ist jetzt aufgesetzt.",
  type: "single-answer",
  answers: []
});

export default profileQuestions;
