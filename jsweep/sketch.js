let grid;
let cols;
let rows;
let cellWidth = 40;
let totalBombs = 10;
let canvas;
let messageTextBox;
messageTextBox = document.getElementById("messageText");

function setup() {
  canvas = createCanvas(401, 401);
  canvas.parent("canvasContainer");
  document
    .getElementById("canvasContainer")
    .addEventListener("contextmenu", (event) => event.preventDefault());
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

function restart() {
  // delete variable??
  console.log("Restart");
  canvas = "";

  document.getElementById("messageText").style.color = "black";
  document.getElementById("messageText").innerText = "Have Fun! Be Safe!";
  setup();
}

function mousePressed() {
  const x = Math.ceil(mouseX / cellWidth) - 1;
  const y = Math.ceil(mouseY / cellWidth) - 1;

  console.log(`
  ************************
  ** Clicked cell ${x}, ${y} **
  ************************`);
  if (mouseButton === LEFT) {
    if (gridMatrix.verifyCoordinates(x, y)) {
      gridMatrix.revealCell(x, y);
    }

    if (keyIsPressed) {
      console.log(`Key Pressed with ${x}, ${y}`);
    }
  } else if (mouseButton === RIGHT) {
    let grid = gridMatrix.getBoard();
    if (grid[x][y].revealed === false) {
      gridMatrix.flagCell(x, y);
    }
  }
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
