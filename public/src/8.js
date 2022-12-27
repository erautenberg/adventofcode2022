const DAY8 = 8;
parseData(DAY8, (input) => {
  const treeHeights = input.map(row => row.split('').map(height => parseInt(height)));
  const part1 = runPart1(treeHeights);
  const part2 = runPart2(treeHeights);
  showAnswers(DAY8, part1, part2);
});

/**
 * Calculates the answer to Day 8, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(heights) {
  const visibility = getVisibility(heights);
  return sumVisibleTrees(visibility);
}

/**
 * Calculates the answer to Day 8, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(heights) {
  const distances = getVisibilityDistances(heights);
  const scores = getScenicScore(distances);
  return findMaxScore(scores);
}

/**
 * Given a 2D array of tree heights, determine is a tree has visiblity in at least one direction
 * and return an 2D array that marks each tree as 0 (no visiblity) or 1 (visibility).
 * 
 * @param {array} heightsByRow 
 * @returns {array}
 */
function getVisibility(heightsByRow) {
  const heightsByColumn = transpose(heightsByRow);
  let visibility = Array.apply(null, new Array(heightsByRow.length)).map(() => new Array(heightsByColumn.length).fill(0));
  
  for (let row=0; row<heightsByRow.length; row++) {
    for (let col=0; col<heightsByRow[row].length; col++) {
      let isVisible = false;
      if (
        row === 0 ||
        row === heightsByRow.length - 1 ||
        col === 0 ||
        col === heightsByColumn.length - 1
      ) {
        isVisible = true;
      } else {
        const currRow = heightsByRow[row];
        const currColumn = heightsByColumn[col];
        const currHeight = currRow[col];
        if (
          // From beginning (0) to current row index
          currHeight > Math.max(...currRow.slice(0, col)) ||
          // From current row index to end (row length)
          currHeight > Math.max(...currRow.slice(col + 1)) ||
          // From beginning (0) to current column index
          currHeight > Math.max(...currColumn.slice(0, row)) ||
          // From current column index to end (column length)
          currHeight > Math.max(...currColumn.slice(row + 1))
        ) {
          isVisible = true;
        }
      }
      if (isVisible) {
        visibility[row][col] = 1;
      }
    }
  }

  return visibility;
}

/**
 * Returns the total number of trees with visibility in a 2D by searching for all instances of "1".
 * 
 * @param {array} visibility 
 * @returns {number}
 */
function sumVisibleTrees(visibility) {
  return visibility.reduce((acc, curr) =>
    acc + curr.filter(isVisible => isVisible === 1).length
  , 0);
}

/**
 * Given a 2D array of tree heights, return a 3D array where the third dimension contains 4 elements
 * representing the visibility distance from the tree at the location (left, right, top, bottom);
 * 
 * @param {array} heightsByRow 
 * @returns {array}
 */
function getVisibilityDistances(heightsByRow) {
  const heightsByColumn = transpose(heightsByRow);
  let visibility = Array.apply(null, new Array(heightsByRow.length)).map(() => new Array(heightsByColumn.length).fill(0));
  
  for (let row=0; row<heightsByRow.length; row++) {
    for (let col=0; col<heightsByRow[row].length; col++) {
      let distances = [];
      if (
        row === 0 ||
        row === heightsByRow.length - 1 ||
        col === 0 ||
        col === heightsByColumn.length - 1
      ) {
        distances = new Array(4).fill(1);
      } else {
        const currRow = heightsByRow[row];
        const currColumn = heightsByColumn[col];
        const currHeight = currRow[col];

        distances = [
          getVisibilityDistance(currHeight, currRow.slice(0, col).reverse()), // left
          getVisibilityDistance(currHeight, currRow.slice(col + 1)), // right
          getVisibilityDistance(currHeight, currColumn.slice(0, row).reverse()), // up
          getVisibilityDistance(currHeight, currColumn.slice(row + 1)), // down
        ];
      }
      
      visibility[row][col] = distances;
    }
  }

  return visibility;
}

/**
 * Calculates the visibility distance based on a height and
 * the heights of the trees in a line from it.
 * 
 * @param {number} tree 
 * @param {array} heights 
 * @returns {number}
 */
function getVisibilityDistance(tree, heights) {
  let i = 0;
  while (i < heights.length) {
    if (tree > heights[i]) {
      i++;
    }
    if (tree <= heights[i]) {
      i++;
      break;
    }
  }
  return i;
}

/**
 * Creates a 2D array where each number represents the scenic score of a tree
 * by multipling the 4 visibility distances of each tree.
 * 
 * @param {array} allDistances 
 * @returns {array}
 */
function getScenicScore(allDistances) {
  return allDistances.map(row =>
    row.map(distances =>
      distances.reduce((acc, curr) => acc * curr, 1)
    )
  );
}

/**
 * Find the highest number in a 2D array.
 * 
 * @param {array} scores 
 * @returns {number}
 */
function findMaxScore(scores) {
  return Math.max(...scores.map(row => Math.max(...row)));
}