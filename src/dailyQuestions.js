var dailyQuestions = new Map();

dailyQuestions.set("how_are_you_doing", {
  question: "How are you doing today?",
  answers: [
    {
      answer: "I am doing perfectly well!",
      next: "doing_fine",
      resolve: () => {}
    },
    {
      answer: "I am doing perfectly well!",
      next: "not_doing_fine",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("doing_fine", {
  question: "Great to hear! In this case there is nothing more to say!",
  answers: []
});

dailyQuestions.set("not_doing_fine", {
  question: "Ohi! Do you have strong symptoms or simply feel unwell?",
  answers: [
    {
      answer: "I have clear symptoms...",
      next: "clear_symptoms",
      resolve: () => {}
    },
    {
      answer: "Just not feel at my best!",
      next: "mild_symptoms",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("clear_symptoms", {
  question: "Did you get any of these symptoms?",
  answers: [
    {
      answer: "Breathing problems",
      next: "symptoms_reported",
      resolve: report => (report.hasBreathingProblems = true)
    },
    {
      answer: "None of these...",
      next: "symptoms_reported",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("mild_symptoms", {
  question: "Did you get any of these symptoms?",
  answers: [
    {
      answer: "General weakness",
      next: "symptoms_reported",
      resolve: report => (report.feelsWeak = true)
    },
    {
      answer: "None of these...",
      next: "symptoms_reported",
      resolve: () => {}
    }
  ]
});

dailyQuestions.set("symptoms_reported", {
  question:
    "Thank you for letting us know about your symptoms. We'll get in touch with you if we believe you'll require further care",
  answers: []
});

export default dailyQuestions;
