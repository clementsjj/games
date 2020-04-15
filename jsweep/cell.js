class Cell {
  constructor(indexi, indexj, width) {
    this.i = indexi;
    this.j = indexj;
    this.width = width;
    this.x = indexi * width;
    this.y = indexj * width;
    this.neighboringBombs = 0;

    this.bomb = false;
    this.revealed = false;
  }

  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.width, this.width);
    if (this.revealed) {
      if (this.bomb) {
        // TODO: place mine emoji here
        fill(127);
        ellipse(
          this.x + this.width * 0.5,
          this.y + this.width * 0.5,
          this.width * 0.5
        );
      } else {
        fill(127);
        rect(this.x, this.y, this.width, this.width);
        if (this.neighboringBombs > 0) {
          textAlign(CENTER);
          fill(0);
          text(
            this.neighboringBombs,
            this.x + this.width * 0.5,
            this.y + this.width / 2
          );
        }
      }
    }
  }

  countBombs(grid) {
    if (this.bomb) {
      this.neighboringBombs = -1;
      return;
    }
    let total = 0;

    for (let xoffset = -1; xoffset <= 1; xoffset++) {
      let i = this.i + xoffset;
      if (i < 0 || i >= cols) continue;

      for (let yoff = -1; yoff <= 1; yoff++) {
        let j = this.j + yoff;
        if (j < 0 || j >= rows) continue;
        let neighbor = grid[i][j];
        if (neighbor.bomb) {
          total++;
        }
      }
    }
    this.neighboringBombs = total;
  }

  contains(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }

  revealCell(grid) {
    this.revealed = true;
    if (this.neighboringBombs == 0) {
      this.floodFill(grid);
    }
  }

  floodFill(grid) {
    console.log("reveal ", grid);
    for (let xoffset = -1; xoffset <= 1; xoffset++) {
      for (let yoffset = 1; yoffset <= 1; yoffset++) {
        let i = this.i + xoffset;
        let j = this.j + yoffset;

        if (i > -1 && i < cols && j > -1 && j < rows) {
          //Sometimes Error here
          let neighbor = grid[i][j];
          console.log(`neighbor: `, neighbor, neighbor.bomb);
          if (!neighbor.bomb && !neighbor.revealed) {
            neighbor.revealCell();
          }
        }
      }
    }
  }
}
