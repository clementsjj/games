let grid;
let cols;
let rows;
let cellWidth = 40;
let totalBombs = 10;

function setup() {
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
  gridMatrix = new Board({ cols, rows, cellWidth, bombs: totalBombs });
  gridMatrix.make2dArray();
  gridMatrix.insertNeighboringBombData();
}

function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  const x = Math.ceil(mouseX / cellWidth) - 1;
  const y = Math.ceil(mouseY / cellWidth) - 1;
  let cell = gridMatrix.getBoardPosition(x, y);
  console.log(cell);
  cell.revealCell(gridMatrix.getBoard());

  if (keyIsPressed) {
    console.log(x, y);
  }

  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     let cell = gridMatrix.getBoard(i, j);
  //     console.log(cell);
  //     if (cell.contains(x, y)) {
  //       cell.revealCell();

  //       if (cell.bomb) {
  //         gameOver();
  //       }
  //     }
  //   }
  // }
}

function draw() {
  background(200);
  gridMatrix.drawGrid();
  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     gridMatrix[i][j].show();
  //   }
  // }
}
