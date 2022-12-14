const DAY1 = 1;
parseData(DAY1, (input) => {
  const inputArray = input.map(n => parseInt(n));
  const part1 = runPart1(inputArray);
  const part2 = runPart2(inputArray);
  showAnswers(DAY1, part1, part2);
});

/**
 * Calculates the answer to Day 1, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(input) {
  const calories = parseCalories(input);
  const totalCaloriesByElf = sumCalories(calories);
  return Math.max(...totalCaloriesByElf);
}

/**
 * Calculates the answer to Day 1, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(input) {
  const calories = parseCalories(input);
  const totalCaloriesByElf = sumCalories(calories);
  const maxCalorieArray = findMaxes(totalCaloriesByElf, 3);
  return sumCalories([maxCalorieArray])[0];
}

/**
 * Returns a new array where each entry is an array that represents an elf's snack's calorie count
 * 
 * @param {array} input 
 * @returns {array}
 */
function parseCalories(input) {
  let elfIndex = 0;
  return input.reduce((acc, curr) => {
    if (Number.isNaN(curr)) {
      acc.push([]);
      elfIndex++;
    } else if (curr !== undefined) {
      acc[elfIndex].push(curr);
    }
    return acc;
  }, [[]]);
}

/**
 * Returns a new array where each entry represents the total number of calories an elf has in snacks
 * 
 * @param {array} calories 
 * @returns {array}
 */
function sumCalories(calories) {
  return calories.map(elf => elf.reduce((acc, curr) => acc + curr, 0));
}

/**
 * 
 * Returns an array of the requested amount (maxCount) of highest numbers in the array
 * 
 * @param {array} arr 
 * @param {number} maxCount 
 * @returns {number}
 */
function findMaxes(arr, maxCount) {
  let maxArr = Array.apply(null, Array(maxCount)).map(() => 0);
  arr.forEach(elem => {
    let currMin = Math.min(...maxArr);
    if (elem > currMin) {
      maxArr[maxArr.indexOf(currMin)] = elem;
    }
  });

  return maxArr;
}