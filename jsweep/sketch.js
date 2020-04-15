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
let w = 40;
let totalBees = 10;

function setup() {
  console.log("creating canvas");
  createCanvas(401, 401);
  cols = floor(width / w);
  rows = floor(height / w);

  console.log(
    "cols: ",
    cols,
    "rows: ",
    rows,
    "cell width: ",
    w,
    "\nwidth: ",
    width,
    "\nheight",
    height
  );
  grid = make2dArray(cols, rows);

  console.log("constructing cells...");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // An array of evry possible option on the board
  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n < totalBees; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];

    options.splice(index, 1);
    grid[i][j].bee = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countBees();
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
        grid[i][j].reveal();

        if (grid[i][j].bee) {
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
