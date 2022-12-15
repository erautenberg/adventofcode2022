const DAY2 = 2;
parseData(DAY2, (input) => {
  // const inputArray = input.map(n => parseInt(n));
  const part1 = runPart1(input);
  const part2 = null;
  showAnswers(DAY2, part1, part2);
});

/**
 * Calculates the answer to Day 1, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(input) {
  const rounds = parseRounds(input);
  return rounds.reduce((acc, curr) => acc + calculateScore(curr), 0);
}

/**
 * Calculates the answer to Day 1, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(input) {
  return null;
}


// Rock: A or X
// Paper: B or Y
// Scissor: C or Z
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

const SCORES = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissor
  1: 6, // win
  0: 3, // draw
  '-1': 0 // lose
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
  const opponent = round[0];
  const self = round[1];
  const matchScore = RESULTS[self][opponent];
  return SCORES[self] + SCORES[matchScore];
}