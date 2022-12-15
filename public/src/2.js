const DAY2 = 2;
parseData(DAY2, (input) => {
  const part1 = runPart1(input);
  const part2 = runPart2(input);;
  showAnswers(DAY2, part1, part2);
});

/**
 * Calculates the answer to Day 2, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(input) {
  const rounds = parseRounds(input);
  return rounds.reduce((acc, curr) => acc + calculateScore(curr), 0);
}

/**
 * Calculates the answer to Day 2, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(input) {
  const rounds = parseRounds(input);
  return rounds.reduce((acc, curr) => acc + calculateScore2(curr), 0);
}

/**
 * This looks up the amount of points you earn by playing a certain move
 * as well as the points you earn from the outcome of the match.
 */
const SCORES = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissor
  1: 6, // win
  0: 3, // draw
  '-1': 0 // lose
};


/**
 * This object is written as if "RESULTS2.X.A" would represent the outcome for you
 * (win, lose, draw) of a match where you play X, Y, or Z, and the opponenent plays A, B, or C.
 * 
 * Rock: A or X
 * Paper: B or Y
 * Scissor: C or Z
 */
const RESULTS = {
  X: { // rock
    A: 0, // draw against rock
    B: -1, // loses against paper
    C: 1 // wins against scissors
  },
  Y: { // paper
    A: 1, // wins against rock
    B: 0, // draws against paper
    C: -1 // loses against scissors
  },
  Z: { // scissor
    A: -1, // loses against rock
    B: 1, // wins against paper
    C: 0 // draws against scissors
  }
};

/**
 * Based on new information, this maps the input's lose, draw, and win symbols to
 * the numbers the other objects understand.
 */
const CONVERSION = {
  X: -1, // need to lose
  Y: 0, // need to draw
  Z: 1 // need to win
};

/**
 * This object is written as if "RESULTS2.A.1" would represent what you as the player
 * need to play to win against the oppononent who played 'A'.
 * 
 * Rock: A
 * Paper: B
 * Scissor: C
 * Lose: X: lose
 * Y: draw
 * Z: win
 */
const RESULTS2 = {
  A: { // rock
    1: 'Y', // in order to win, play paper (Y)
    0: 'X', // in order to draw, play rock (X)
    '-1': 'Z' // in order to lose, play scissor (Z)
  },
  B: { // paper
    1: 'Z', // in order to win, play scissor (Z)
    0: 'Y', // in order to draw, play paper (Y)
    '-1': 'X' // in order to lose, play rock (X)
  },
  C: { // scissor
    1: 'X', // in order to win, play rock (X)
    0: 'Z', // in order to draw, play scissor (Z)
    '-1': 'Y' // in order to lose, play paper (Y)
  }
};

/**
 * Returns an array of 2D arrays where the first element is the Elf's move and
 * the second element is your's.
 * 
 * @param {array} rounds 
 * @returns {array}
 */
function parseRounds(rounds) {
  return rounds.map(round => round.split(" "));
}

/**
 * Assuming the first element is your opponent's move and the second element is your move,
 * this looks up the score that a round would give you, which gives you points for
 * your move plus if you win, lose, or draw.
 * 
 * @param {array} round 
 * @returns {number}
 */
function calculateScore(round) {
  const opponent = round[0]; // saves the opponent's move
  const self = round[1]; // saves your move
  const outcome = RESULTS[self][opponent]; // looks up the outcome of the match as -1, 0, 1 (lose, draw, win)
  return SCORES[self] + SCORES[outcome];
}

/**
 * Assuming the first element is your opponent's move and the second element is the outcome you need,
 * this looks up the score that a round would give you, which gives you points for
 * your move plus if you win, lose, or draw.
 * 
 * @param {array} round 
 * @returns {number}
 */
function calculateScore2(round) {
  const opponent = round[0]; // saves the opponent's move
  const outcome = round[1]; // saves the desired outcome of the match
  const convertedOutcome = CONVERSION[outcome]; // turns X, Y, Z into -1, 0, 1 (lose, draw, win)
  const self = RESULTS2[opponent][convertedOutcome]; // looks up what you need to play to get the desired outcome
  return SCORES[self] + SCORES[convertedOutcome];
}