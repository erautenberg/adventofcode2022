const DAY4 = 4;
parseData(DAY4, (input) => {
  const part1 = runPart1(input);
  const part2 = runPart2(input);;
  showAnswers(DAY4, part1, part2);
});

/**
 * Calculates the answer to Day 4, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(input) {
  const assignments = parseAssignments(input);
  return assignments.reduce((acc, curr) => compareSections(...curr) ? ++acc : acc, 0);
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
 * Returns an array of arrays where each element is an array that represents a pair of elves's assignments,
 * and each element in that array contains an array denoting each section assigned to that elf.
 * 
 * @param {array} assignments 
 * @returns {array}
 */
function parseAssignments(assignments) {
  return assignments.map(pair => {
    const elves = pair.split(",");
    return elves.map(elf => getArrayFromRange(...getRange(elf)));
  });
}

/**
 * Given a string in the format 'Start#-End#', return an array of the starting and ending number ([Start, End]).
 * 
 * @param {string} elf 
 * @returns {array}
 */
function getRange(elf) {
  return elf.split("-").map(section => parseInt(section));
}

/**
 * Given a start and ending section number, this returns an array of numbers that
 * lists each section an elf is assigned to.
 * 
 * @param {number} start 
 * @param {number} end 
 * @returns {array}
 */
function getArrayFromRange(start, end) {
  let size = end - start + 1;
  return [...Array(size).keys()].map(i => i + start);
}

/**
 * Given two arrays, return true if either array is completed contained inside the other.
 * 
 * @param {array} arr1 
 * @param {array} arr2 
 * @returns {boolean}
 */
function compareSections(arr1, arr2) {
  let maxArr = arr1;
  let minArr = arr2;
  if (arr2.length > arr1.length) {
    maxArr = arr2;
    minArr = arr1;
  }
  return minArr.every(elem => maxArr.includes(elem));
}