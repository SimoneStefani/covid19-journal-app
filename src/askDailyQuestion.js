import dq from "./dailyQuestions";

class AskDailyQuestions {
  constructor() {
    this.dq = dq;
    this.journalEntry = {
      location: undefined,
      hasCough: false,
      hasFever: false,
      hasChills: false,
      feelsWeak: false,
      hasLimbPain: false,
      hasSniff: false,
      hasDiarrhea: false,
      hasSoreThroat: false,
      hasHeadache: false,
      hasBreathingProblems: false
    };
    this.currentQuestion = "how_are_you_doing";
  }

  getQuestion() {
    return dq.get(this.currentQuestion);
  }

  setAnswer(answer) {
    answer.resolve(this.journalEntry);
    this.currentQuestion(answer.next);
  }

  getReport() {
    return this.journalEntry;
  }
}
