const DAY3 = 3;
parseData(DAY3, (input) => {
  const part1 = runPart1(input);
  const part2 = runPart2(input);
  showAnswers(DAY3, part1, part2);
});

/**
 * Calculates the answer to Day 3, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(input) {
  const rucksacks = parseRucksacks(input);
  const priorities = rucksacks.map(rucksack => getItemPriority(findItemInBothCompartments(rucksack)));
  return priorities.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Calculates the answer to Day 3, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(input) {
  const elfGroups = parseElfGroupRucksacks(input);
  const priorities = elfGroups.map(group => getItemPriority(findItemInGroup(group)));
  return priorities.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Returns an array of arrays where each element is an array that represents a rucksack,
 * and each element contains an array of length two, denoting the 2 compartments of the rucksack.
 * Each compartment array then represents an item in the rucksack.
 * 
 * @param {array} rucksacks 
 * @returns {array}
 */
function parseRucksacks(rucksacks) {
  return rucksacks.map(rucksack => {
    const items = rucksack.split("");
    const middleIndex = Math.ceil(items.length / 2);
    return [items.slice(0, middleIndex), items.slice(middleIndex, items.length)];
  });
}

/**
 * Finds the item that exists in both compartments of the rucksack.
 * 
 * @param {array} rucksack 
 * @returns {string}
 */
function findItemInBothCompartments(rucksack) {
  return rucksack[0].filter(item => rucksack[1].includes(item))[0];
}

/**
 * Get the "priority" number of an item, where:
 * Lowercase item types a through z have priorities 1 through 26 and
 * Uppercase item types A through Z have priorities 27 through 52.
 * 
 * @param {string} item 
 * @returns {number}
 */
function getItemPriority(item) {
  // Uppercase A is 65 on the ascii table, but it is 0-based,
  // so we need to offset the character code by 64 (65 - 1),
  // and the uppercase items are priority 27-52,
  // so an additional offset is needed as they are the second half of the priority list (64 - 26 = 38).
  // Lowercase a is 97 on the ascii table, but it is 0-based,
  // so we need to offset the character code by 96 (97 - 1),
  // and the lowercase items are priority 1-26,
  // so no other offset is needed as they are the beginning of the priority list (96 - 0 = 0).
  const offset = item === item.toUpperCase() ? 38 : 96;
  return item.charCodeAt(0) - offset;
}

/**
 * Returns an array of arrays where each element is an array that represents a group of three elves,
 * and each element contains an array of length three, one for each elf,
 * where each element is an array of the items in that elf's rucksack.
 * 
 * @param {array} rucksacks 
 * @returns {array}
 */
function parseElfGroupRucksacks(rucksacks) {
  return rucksacks.reduce((acc, rucksack, index) => {
    items = rucksack.split("");
    if (index % 3 === 0) {
      // need to create a new elf group (array) for every 3rd rucksack
      acc.push([items]);
    } else {
      // otherwise, add the parsed rucksack to the most recent elf group
      acc[acc.length - 1].push(items);
    }
    return acc;
  }, []);
}

/**
 * Finds the item that exists in each elf's rucksack in the group.
 * 
 * @param {array} rucksack 
 * @returns {string}
 */
function findItemInGroup(group) {
  return group.reduce((a, b) => a.filter(c => b.includes(c)))[0];
}