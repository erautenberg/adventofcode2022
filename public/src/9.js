const DAY9 = 9;
parseData(DAY9, (input) => {
  const parsedInput = input.map(line => {
    let [direction, distance] = line.split(" ");
    return { direction, distance: parseInt(distance) };
  });
  const part1 = runPart1(parsedInput);
  const part2 = runPart2(parsedInput);
  showAnswers(DAY9, part1, part2);
});

/**
 * Calculates the answer to Day 9, Part 1
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart1(input) {
  // This can also be replaced with the method for multiple tails
  // (see Part 2) as it was designed to take any number of knots.
  // i.e. "runMotionsMultiTail(input, 2).size"
  return runMotions(input).size;
}

/**
 * Calculates the answer to Day 9, Part 2
 * 
 * @param {array} input 
 * @returns {number}
 */
function runPart2(input) {
  return runMotionsMultiTail(input, 10).size;
}

/**
 * Given a list of instrucitons for the Head and Tail of the knots to follow,
 * log each newly visited point the Tail traverses in a Set.
 * 
 * @param {array} input 
 * @returns {Set}
 */
function runMotions(input) {
  const visited = new Set();
  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };
  visited.add(`${tail.x}, ${tail.y}`);

  input.forEach(instruction => {
    let changeX = 0;
    let changeY = 0;

    if (instruction.direction === 'L') {
      changeX = -1;
    } else if (instruction.direction === 'R') {
      changeX = 1;
    } else if (instruction.direction === 'U') {
      changeY = 1;
    } else if (instruction.direction === 'D') {
      changeY = -1;
    }

    for (let i=0; i < instruction.distance; i++) {
      head = { x: head.x + changeX, y: head.y + changeY };

      // if the Tail is not within 1 space of the Head
      if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
        if (head.x > tail.x && head.y === tail.y) { // same row, H to right of T
          tail.x++;
        } else if (head.x < tail.x && head.y === tail.y) { // same row, H to left of T
          tail.x--;
        } else if (head.y > tail.y && head.x === tail.x) { // same column, H above T
          tail.y++;
        } else if (head.y < tail.y && head.x === tail.x) { // same column, H below T
          tail.y--;
        } else if (head.x > tail.x && head.y > tail.y) { // H diagonally right and above T
          tail.x++;
          tail.y++;
        } else if (head.x < tail.x && head.y > tail.y) { // H diagonally left and above T
          tail.x--;
          tail.y++;
        } else if (head.x > tail.x && head.y < tail.y) { // H diagonally right and below T
          tail.x++;
          tail.y--;
        } else if (head.x < tail.x && head.y < tail.y) { // H diagonally left and below T
          tail.x--;
          tail.y--;
        }

        visited.add(`${tail.x}, ${tail.y}`);
      }
    }
  });
  
  return visited;
}

/**
 * Given a list of instrucitons for the Head and Tail of the knots to follow,
 * as well as a total number of knots, log each newly visited point the LAST Tail traverses in a Set.
 * 
 * @param {array} input 
 * @param {number} knotLength
 * @returns {Set}
 */
function runMotionsMultiTail(input, knotLength) {
  const visited = new Set();
  // let head = { x: 0, y: 0 };
  let knots = new Array(knotLength).fill().map(() => ({ x: 0, y: 0 }));
  // let head = knots[0];
  let endTail = knots[knotLength - 1];
  visited.add(`${endTail.x}, ${endTail.y}`);

  input.forEach(instruction => {
    let changeX = 0;
    let changeY = 0;

    if (instruction.direction === 'L') {
      changeX = -1;
    } else if (instruction.direction === 'R') {
      changeX = 1;
    } else if (instruction.direction === 'U') {
      changeY = 1;
    } else if (instruction.direction === 'D') {
      changeY = -1;
    }

    for (let i=0; i < instruction.distance; i++) {
      knots[0] = { x: knots[0].x + changeX, y: knots[0].y + changeY };
  
      for (let i=1; i<knots.length; i++) {
        knots[i] = updateTails(knots[i - 1], knots[i]);
        if (i === knots.length - 1) {
          visited.add(`${endTail.x}, ${endTail.y}`);
        }
      }
    }
  });
  
  return visited;
}

/**
 * Move the knot to ensure it is always within 1 space of the Head.
 * 
 * @param {Object} head 
 * @param {Object} tail 
 * @returns {Object}
 */
function updateTails(head, tail) {
  // if the Tail is not within 1 space of the Head
  if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
    if (head.x > tail.x && head.y === tail.y) { // same row, H to right of T
      tail.x++;
    } else if (head.x < tail.x && head.y === tail.y) { // same row, H to left of T
      tail.x--;
    } else if (head.y > tail.y && head.x === tail.x) { // same column, H above T
      tail.y++;
    } else if (head.y < tail.y && head.x === tail.x) { // same column, H below T
      tail.y--;
    } else if (head.x > tail.x && head.y > tail.y) { // H diagonally right and above T
      tail.x++;
      tail.y++;
    } else if (head.x < tail.x && head.y > tail.y) { // H diagonally left and above T
      tail.x--;
      tail.y++;
    } else if (head.x > tail.x && head.y < tail.y) { // H diagonally right and below T
      tail.x++;
      tail.y--;
    } else if (head.x < tail.x && head.y < tail.y) { // H diagonally left and below T
      tail.x--;
      tail.y--;
    }
  }
  return tail;
}