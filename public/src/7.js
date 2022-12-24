const DAY7 = 7;
parseData(DAY7, (input) => {
  const part1 = runPart1(input);
  const part2 = runPart2(input);
  showAnswers(DAY7, part1, part2);
});

/**
 * Calculates the answer to Day 7, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(input) {
  const filesystem = parseFilesystem(input);
  filesystem.size = setDirectorySizes(filesystem);
  console.log(filesystem)
  return getSizeTotalBelowCap(filesystem, 100000);
}

/**
 * Calculates the answer to Day 7, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(input) {
  return null;
}

/**
 * Given an array of strings, create a data structure to represent the file system using the following format:
 *  {
 *    name: string,
 *    isDirectory: boolean,
 *    parent: object (same structure as this),
 *    children: array of objects,
 *    size: number (will initially be undefined for directories)
 *  }
 * 
 * @param {array} input 
 * @returns {object}
 */
function parseFilesystem(input) {
  let startReading = false;
  let currentFolder;
  return input.reduce((filesystem, line) => {
    let instruction = line.split(" ");
    if (instruction[0] === '$') {
      const command = instruction[1];
      if (command === 'cd') {
        startReading = false;
        const path = instruction[2];
        if (path === '/') {
          currentFolder = filesystem;
        } else if (path === '..') {
          currentFolder = currentFolder?.parent;
        } else {
          currentFolder = currentFolder?.children.find(item => item.isDirectory && item.name === path);
        }
      } else if (command === 'ls') {
        startReading = true;
      }
    } else if (startReading) {
      const name = instruction[1];
      currentFolder?.children.push(
        instruction[0] === 'dir' ?
          createNewDirectory(name, currentFolder) :
          createNewFile(name, parseInt(instruction[0]))
      );
    }
    return filesystem;
  }, createNewDirectory('/', null)); 
}

/**
 * Create a new object representing a directory.
 * 
 * @param {string} name 
 * @param {object} parent 
 * @returns {object} 
 */
function createNewDirectory(name, parent) {
  return {
    name,
    isDirectory: true,
    children: [],
    parent
  };
}

/**
 * Create a new object representing a file.
 * 
 * @param {string} name 
 * @param {number} size 
 * @returns {object} 
 */
function createNewFile(name, size) {
  return {
    name,
    isDirectory: false,
    size
  };
}

/**
 * Calculate the total size of each directory by iterating through all of its children.
 * 
 * @param {object} folder 
 * @returns {number}
 */
function setDirectorySizes(folder) {
  return folder.children.reduce((sum, item) => {
    if (item.isDirectory) {
      item.size = setDirectorySizes(item);
    }
    return sum += item.size;
  }, 0);
};

/**
 * Find all directories with a total size less than the given cap and sum them.
 * 
 * @param {object} folder 
 * @param {number} cap 
 * @returns {number}
 */
function getSizeTotalBelowCap(folder, cap) {
  return folder.children.reduce((sum, item) => {
    if (item.isDirectory) {
      sum += getSizeTotalBelowCap(item, cap);
      if (item.size < cap) {
        sum += item.size;
      }
    }
    return sum;
  }, 0);
}