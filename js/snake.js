game.snake = {
  cells: [],
  mooving: false,
  direction: null,
  directions: {
    up: {
      row: -1,
      col: 0,
      angle: 0
    },
    down: {
      row: 1,
      col: 0,
      angle: 180
    },
    left: {
      row: 0,
      col: -1,
      angle: 270
    },
    right: {
      row: 0,
      col: 1,
      angle: 90
    }
  },

  create() {
    const startCells = [{row: 7, col: 7}, {row: 8, col: 7}];
    this.direction = this.directions.up;

    for (let startCell of startCells) {
      this.cells.push(game.board.getCells(startCell.row, startCell.col));
    }
  },

  hasCell(cell) {
    return this.cells.find(part => part === cell);
  },

  renderHead() {
    const head = this.cells[0];
    const halfSize = game.sprites.head.width / 2;

    game.ctx.save();
    game.ctx.translate(head.x, head.y);
    game.ctx.translate(halfSize, halfSize);
    const degree = this.direction.angle;
    game.ctx.rotate(degree * Math.PI / 180);
    game.ctx.drawImage(game.sprites.head, -halfSize, -halfSize);
    game.ctx.restore();
  },

  renderBody() {
    const body = this.cells.slice(1);
    body.forEach(cell => {
      game.ctx.drawImage(game.sprites.body, cell.x, cell.y)
    });
  },

  render() {
    this.renderHead();
    this.renderBody();
  },

  start(keyCode) {
    switch(keyCode) {
      case 38:
        this.direction = this.directions.up;
        break;
      case 37:
        this.direction = this.directions.left;
        break;
      case 39:
        this.direction = this.directions.right;
        break;
      case 40:
        this.direction = this.directions.down;
        break;
    }

    if (!this.mooving) {
      game.onSnaceStart();
    }
    this.mooving = true;
  },

  move() {
    if (!this.mooving) {
      return;
    }
     const cell = this.getNextCell();

     if (!cell || this.hasCell(cell) || game.board.isBombCell(cell)) {
      game.stop();
     } else {
      this.cells.unshift(cell);
      if (!game.board.isFoodCell(cell)) {
       this.cells.pop();
      } else {
        game.onSnakeEat();
      }
     }
  },

  getNextCell() {
    const head = this.cells[0];

    const row = head.row + this.direction.row;
    const col = head.col + this.direction.col;
    return game.board.getCells(row, col);
  }
}