class Cell {
  constructor(indexi, indexj, width) {
    this.i = indexi;
    this.j = indexj;
    this.width = width;
    this.x = indexi * width;
    this.y = indexj * width;
    this.neighboringBombs = 0;
    this.flagged = false;
    this.bomb = false;
    this.revealed = false;
  }

  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.width, this.width);
    if (this.revealed) {
      if (this.bomb) {
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(192, 192, 192);
        text("🌲", this.x + this.width * 0.5, this.y + this.width / 2);
        // TODO: place mine emoji here
        // fill(127);
        // ellipse(
        //   this.x + this.width * 0.5,
        //   this.y + this.width * 0.5,
        //   this.width * 0.5
        // );
      } else {
        fill(128, 128, 128);
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

    if (this.flagged) {
      textSize(12);
      textAlign(CENTER, CENTER);
      fill(0, 102, 153);
      text("🚩", this.x + this.width * 0.5, this.y + this.width / 2);
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
  }
}
