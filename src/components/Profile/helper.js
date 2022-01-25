export const countCompletionRate = (puzzles) => {
  if (!puzzles) {
    return;
  }
  let rate = 0;
  for (let i = 0; i < puzzles.length; i++) {
    rate = rate + puzzles[i].correct_answers / puzzles[i].possible_answers;
  }

  return Math.floor(rate / puzzles.length);
};
export const countAverageCorrectRate = (puzzles) => {
  if (!puzzles) {
    return;
  }
  let correctRate = 0;

  for (let i = 0; i < puzzles.length; i++) {
    if (puzzles[i].errors == 0) {
      correctRate = correctRate + 100;
    } else {
      correctRate =
        correctRate + puzzles[i].correct_answers / puzzles[i].errors;
    }
  }

  return Math.floor(correctRate / puzzles.length);
};

export const countAverageCorrectAnswers = (puzzles) => {
  if (!puzzles) {
    return;
  }
  let answers = 0;
  for (let i = 0; i < puzzles.length; i++) {
    answers = answers + puzzles[i].correct_answers;
  }

  return Math.floor(answers / puzzles.length);
};
