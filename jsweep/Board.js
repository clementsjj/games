class Board {
  constructor({ cols, rows, cellWidth, bombs }) {
    this.cols = cols;
    this.rows = rows;
    this.width = cellWidth;
    this.grid = [];
    this.cellOptions = [];
    this.cellTiles = [];
    this.gameOver = false;
    this.victory = false;
    this.totalBombs = bombs;

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
  }

  getBoardPosition(i, j) {
    return this.grid[i][j];
  }

  getBoard() {
    return this.grid;
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
    }
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
