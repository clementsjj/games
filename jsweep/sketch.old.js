function make2dArray(cols, rows) {
  console.log("making 2d array..");
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let cellWidth = 40;
let totalBombs = 10;

function setup() {
  console.log("creating canvas");
  createCanvas(401, 401);
  cols = floor(width / cellWidth);
  rows = floor(height / cellWidth);

  console.log(
    "cols: ",
    cols,
    "rows: ",
    rows,
    "cell width: ",
    cellWidth,
    "\nwidth: ",
    width,
    "\nheight",
    height
  );
  grid = make2dArray(cols, rows);
  gridMatrix = new Board({ cols, rows, width });

  console.log("constructing cells...");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, cellWidth);
    }
  }

  // An array of evry possible option on the board
  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n < totalBombs; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];

    options.splice(index, 1);
    grid[i][j].bomb = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countBombs();
    }
  }
}

function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].revealCell();

        if (grid[i][j].bomb) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  background(200);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
