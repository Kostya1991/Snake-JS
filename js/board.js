game.board = {
  size: 15,
  cells: [],

  create() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        this.cells.push(this.createCell(row, col));
      }
    }
  },

  createCell(row, col) {
    const cellSize = game.sprites.cell.width + 1;
    const offsetX = (game.size.width - cellSize * this.size) / 2;
    const offsety = (game.size.height - cellSize * this.size) / 2;

    return {
      row,
      col,
      x: offsetX + cellSize * col,
      y: offsety + cellSize * row
    }
  },

  createCellObject(type) {
    let cell = this.cells.find(cell => cell.type === type);
    if (cell) {
      cell.type = false;
    }

    cell = this.getRandomAvailableCell();
    cell.type = type;
  },

  createFood() {
    this.createCellObject('food');
  },

  isFoodCell(cell) {
    return cell.type == 'food'
  },

  createBomd() {
    this.createCellObject('bomb');
  },

  isBombCell(cell) {
    return cell.type == 'bomb'
  },

  getRandomAvailableCell() {
    const pool = this.cells.filter(cell => !cell.type && !game.snake.hasCell(cell));
    const index = game.random(0, pool.length - 1);
    return pool[index];
  },

  getCells(row, col) {
    return this.cells.find(cell => cell.row === row && cell.col === col);
  },

  render() {
    this.cells.forEach(cell => {
      game.ctx.drawImage(game.sprites.cell, cell.x, cell.y);
      if (cell.type) {
        game.ctx.drawImage(game.sprites[cell.type], cell.x, cell.y);
      }
    });
  }
}