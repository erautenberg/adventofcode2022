const DAY6 = 6;
parseData(DAY6, (input) => {
  const part1 = runPart1(input);
  const part2 = runPart2(input);
  showAnswers(DAY6, part1, part2);
});

/**
 * Calculates the answer to Day 6, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(input) {
  return findMarker(input[0].split(''), 4);;
}

/**
 * Calculates the answer to Day 6, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(input) {
  return null;
}

/**
 * Searches an array of characters for the index of a character after the first set of
 * `markerCount` characters that are all unique and returns that index.
 * 
 * @param {array} buffer 
 * @param {number} markerCount 
 * @returns {number}
 */
function findMarker(buffer, markerCount) {
  let index = 0;
  let marker = buffer.slice(0, markerCount);
  while (index < buffer.length - markerCount && hasDuplicates(marker)) {
    marker = buffer.slice(++index, index + markerCount);
  }
  return index + markerCount;
}

/**
 * Checks if any repetitive characters are found in an array.
 * 
 * @param {array} array 
 * @returns {boolean}
 */
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}