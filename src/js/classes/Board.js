import Helper from './Helper';

export default class Board extends Helper {
    constructor (size, cells) {
        super();
        this.size = size;
        this.cells = cells;
    }
    
    create(gameSize, sprites) {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.cells.push(this.createCell(row, col, gameSize, sprites));
            }
        }
    }

    createCell(row, col, gameSize, sprites) {
        const cellSize = sprites.cell.width + 1;
        const offsetX = (gameSize.size.width - cellSize * this.size) / 2;
        const offsety = (gameSize.size.height - cellSize * this.size) / 2;

        return {
            row,
            col,
            x: offsetX + cellSize * col,
            y: offsety + cellSize * row
        }
    }

    createCellObject(type, snake) {
        let cell = this.cells.find(cell => cell.type === type);
        if (cell) {
            cell.type = false;
        }

        cell = this.getRandomAvailableCell(snake);
        cell.type = type;
    }

    createFood(snake) {
        this.createCellObject('food', snake);
    }

    isFoodCell(cell) {
        return cell.type == 'food'
    }

    createBomd(snake) {
        this.createCellObject('bomb', snake);
    }

    isBombCell(cell) {
        return cell.type == 'bomb'
    }

    getRandomAvailableCell(snake) {
        const pool = this.cells.filter(cell => !cell.type && !snake.hasCell(cell));
        const index = this.random(0, pool.length - 1);
        return pool[index];
    }

    getCells(row, col) {
        return this.cells.find(cell => cell.row === row && cell.col === col);
    }

    render(sprites, ctx) {
        this.cells.forEach(cell => {
            ctx.drawImage(sprites.cell, cell.x, cell.y);
            if (cell.type) {
                ctx.drawImage(sprites[cell.type], cell.x, cell.y);
            }
        });
    }
}