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
  return sumVisibleTrees(getVisibility(heights));
}

/**
 * Calculates the answer to Day 8, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(heights) {
  return null;
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