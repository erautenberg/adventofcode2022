const DAY5 = 5;
parseData(DAY5, (input) => {
  const instructionIndex = input.indexOf("");
  const crates = input.slice(0, instructionIndex - 1);
  // const stacks = input.slice(instructionIndex - 1, instructionIndex);
  const instructions = input.slice(instructionIndex + 1);
  console.log(instructions);
  const part1 = runPart1(crates, instructions);
  const part2 = runPart2();
  showAnswers(DAY5, part1, part2);
});

/**
 * Calculates the answer to Day 4, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(crates, instructions) {
  const stacks = generateStacks(crates.map(row => parseCrates(row)));
  const parsedInstructions = parseInstructions(instructions);
  const arrangedStacks = rearrangeCrates(stacks, parsedInstructions);
  return arrangedStacks.map(stack => stack[stack.length - 1]).join('');
}

/**
 * Calculates the answer to Day 4, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(input) {
  return null;
}

/**
 * Given a string in this format "[A] [B] [C]" where the "[X]" can instead be "   ",
 * return an array of the crate names and empty spaces where a crate can go.
 * 
 * @param {string} row 
 * @returns  {array}
 */
function parseCrates(row) {
  return row.split('').reduce((acc, curr, index) => {
    if (index % 4 === 0) {
      acc.push(row[index + 1]);
    }
    return acc;
  }, []);
}

/**
 * Given a 2D array where each element is a row of crates (a matrix),
 * invert the structure so that the 2D array instead represents
 * the order crates are in a numbered stack.
 * The first element in each stack's array represents the crate at the bottom.
 * 
 * @param {array} crates 
 * @returns {array}
 */
function generateStacks(crates) {
  return transpose(crates).map(stack => stack.filter(crate => crate !== ' ').reverse());
}

/**
 * Given an array of strings in the format "move X from Y to Z",
 * create an object for each instructions containing:
 *    an "amount" of how many crates (X) should be moved,
 *    a "target" stack to move crates from (Y), and
 *    a "destination" stack to move crates to (Z).
 * 
 * @param {array} instructions 
 * @returns {array}
 */
function parseInstructions(instructions) {
  const regex = /\D*(?<amount>\d*)\D*(?<target>\d*)\D*(?<destination>\d*)/;
  return instructions.map(instr => instr.match(regex).groups);
}

/**
 * Using the parsed instructions, move crates from one stack to another.
 * 
 * @param {array} stacks 
 * @param {arry} instructions 
 * @returns {array}
 */
function rearrangeCrates(stacks, instructions) {
  instructions.forEach(instr => {
    for (let i=0; i<instr.amount; i++) {
      stacks[instr.destination - 1].push(stacks[instr.target - 1].pop());
    }
  });
  return stacks;
}