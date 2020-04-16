class Board {
  constructor({ cols, rows, cellWidth, bombs }) {
    this.cols = cols;
    this.rows = rows;
    this.width = cellWidth;
    this.grid = [];
    this.cellOptions = [];
    this.cellTiles = [];
    this.bombLocations = [];
    this.flagLocations = [];
    this.isGameOver = false;
    this.isVictorious = false;
    this.totalBombs = bombs;
    this.availableFlags = this.totalBombs;
    this.messageText = document.getElementById("messageText");
    this.flagBox = document.getElementById("flags");
    this.totalFlagsBox = document.getElementById("totalFlags");
    this.make2dArray = this.make2dArray.bind(this);
    this.placeBombs = this.placeBombs.bind(this);
  }

  make2dArray() {
    for (let i = 0; i < this.cols; i++) {
      let line = [];
      this.grid.push(line);
      for (let j = 0; j < this.rows; j++) {
        let cell = new Cell(i, j, this.width);
        this.cellTiles.push(cell);
        this.cellOptions.push([i, j]);
        line.push(cell);
      }
    }
    this.placeBombs();
    this.flagBox.innerText = this.availableFlags;
    this.totalFlagsBox.innerText = this.totalBombs;
  }

  placeBombs() {
    let bombOptions = [...this.cellOptions];
    for (let n = 0; n < this.totalBombs; n++) {
      let index = floor(random(this.cellOptions.length));
      let choice = this.cellOptions[index];
      let i = choice[0];
      let j = choice[1];
      bombOptions.splice(index, 1);
      this.grid[i][j].bomb = true;
      this.bombLocations.push([i, j]);
    }
  }

  getBoardPosition(i, j) {
    return this.grid[i][j];
  }

  getBoard() {
    return this.grid;
  }

  revealCell(x, y) {
    let cell = this.grid[x][y];
    cell.revealed = true;

    if (cell.bomb) {
      this.messageText.style.color = "red";
      this.messageText.innerText = `Boom!
      Game Over!`;
      console.log("Bomb Found");
      this.gameOver();
    } else {
      if (cell.neighboringBombs === 0) {
        let neighborArray = this.getCellNeighbors(x, y);
        neighborArray.forEach((x) => this.revealAdjacentCells(x));
      }
    }
  }

  revealAdjacentCells(cellCoord) {
    let x = cellCoord[0];
    let y = cellCoord[1];
    let cell = this.grid[x][y];
    if (!cell.bomb && !cell.revealed) {
      cell.revealed = true;
      if (cell.neighboringBombs === 0) {
        let neighbors = this.getCellNeighbors(x, y);
        neighbors.forEach((cell) => this.revealAdjacentCells(cell));
      }
    }
  }

  getCellNeighbors(x, y) {
    let neighborsArray = [];
    for (let xoffset = -1; xoffset <= 1; xoffset++) {
      for (let yoffset = -1; yoffset <= 1; yoffset++) {
        let checkX = x + xoffset;
        let checkY = y + yoffset;
        if (checkX > -1 && checkX < cols && checkY > -1 && checkY < rows) {
          if (JSON.stringify([checkX, checkY]) !== JSON.stringify([x, y])) {
            neighborsArray.push([checkX, checkY]);
          }
        }
      }
    }
    return neighborsArray;
  }

  flagCell(i, j) {
    if (this.grid[i][j].flagged === true) {
      this.grid[i][j].flagged = false;
      this.availableFlags++;
      this.flagBox.innerText = this.availableFlags;
      // Remove From flagLocations
      //JSON Stringify?
      this.flagLocations.filter((cell) => cell !== [i, j]);
    } else {
      if (this.availableFlags > 0) {
        this.grid[i][j].flagged = true;
        this.availableFlags--;
        this.flagBox.innerText = this.availableFlags;
        // Add to flagLocations
        this.flagLocations.push([i, j]);
      }
    }
    if (this.availableFlags === 0) {
      console.log("Flags Array: ", this.flagLocations.sort());
      console.log("Bombs Array: ", this.bombLocations.sort());

      //   if (
      //     JSON.stringify(this.flagLocations[i]) ===
      //     JSON.stringify(this.bombLocations[i])
      //   ) {
      // this.victory = true;
      // for (let i = 0; i < this.cols; i++) {
      //   for (let j = 0; j < this.rows; j++) {
      //     this.grid[i][j].revealed = true;
      //   }
      // }
      // this.messageText.style.color = "green";
      // this.messageText.innerText = "VICTORY!!!";

      this.victory();
      //   }
    }
  }

  victory() {
    this.isVictorious = true;
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].revealed = true;
      }
    }
    this.messageText.innerText = "Victory!!!";

    setInterval(() => {
      if ((this.messageText.style.color = "green")) {
        this.messageText.style.color = "#c0c0c0";
        this.messageText.style.backgroundColor = "green";
      } else {
        this.messageText.style.color = "green";
        this.messageText.style.backgroundColor = "#c0c0c0";
      }
    }, 1000);
  }

  gameOver() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].revealed = true;
      }
    }
  }

  verifyCoordinates(x, y) {
    if (x < 0 || x > this.rows) {
      return false;
    }
    if (y < 0 || y > this.rows) {
      return false;
    }
    return true;
  }

  insertNeighboringBombData() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].countBombs(this.grid, i, j);
      }
    }
  }

  drawGrid() {
    this.cellTiles.forEach((tile) => tile.show());
  }
}
