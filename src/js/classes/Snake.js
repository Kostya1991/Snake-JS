export default class Snake {
    constructor (cells, mooving, direction) {
        this.cells = cells;
        this.mooving = mooving;
        this.direction = direction;
        this.score = 0;
        this.directions = {
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
          };
    }

    create(board) {
        const startCells = [{row: 7, col: 7}, {row: 8, col: 7}];
        this.direction = this.directions.up;

        for (let startCell of startCells) {
            this.cells.push(board.getCells(startCell.row, startCell.col));
        }
    }

    hasCell(cell) {
        return this.cells.find(part => part === cell);
    }

    renderHead(ctx, sprites) {
        const head = this.cells[0];
        const halfSize = sprites.head.width / 2;

        ctx.save();
        ctx.translate(head.x, head.y);
        ctx.translate(halfSize, halfSize);
        const degree = this.direction.angle;
        ctx.rotate(degree * Math.PI / 180);
        ctx.drawImage(sprites.head, -halfSize, -halfSize);
        ctx.restore();
    }

    renderBody(ctx, sprites) {
        const body = this.cells.slice(1);
        body.forEach(cell => {
            ctx.drawImage(sprites.body, cell.x, cell.y)
        });
    }

    render(ctx, sprites) {
        this.renderHead(ctx, sprites);
        this.renderBody(ctx, sprites);
    }

    start(keyCode, sounds) {
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
            this.onSnaceStart(sounds);
        }
        this.mooving = true;
    }

    move(board, gameStop, sounds) {
        if (!this.mooving) {
            return;
        }
        const cell = this.getNextCell(board);

        if (!cell || this.hasCell(cell) || board.isBombCell(cell)) {
            gameStop();
        } else {
            this.cells.unshift(cell);
            if (!board.isFoodCell(cell)) {
            this.cells.pop();
            } else {
                this.onSnakeEat(board, sounds);
            }
        }
    }

    getNextCell(board) {
        const head = this.cells[0];

        const row = head.row + this.direction.row;
        const col = head.col + this.direction.col;
        return board.getCells(row, col);
    }

    onSnaceStart(sounds) {
        sounds.theme.loop = true;
        sounds.theme.play();
    }

    onSnakeEat(board, sounds) {
        this.score++;
        sounds.food.play();
        board.createFood(this);
    }
}