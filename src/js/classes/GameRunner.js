export default class GameRunner {
    constructor (gameInterval, bombInterval) {
        this.gameInterval = gameInterval;
        this.bombInterval = bombInterval;
    }

    gameRun(canvas, snake, board, size, sprites, sounds) {
        this.gameInterval = setInterval(() => {
            this.update(canvas, snake, board, size, sprites, sounds);
        }, 150);

        this.bombInterval = setInterval(() => {
            if (snake.mooving) {
                board.createBomd(snake);
            }
        }, 3000);
    }

    gameStop(sounds) {
        clearInterval(this.gameInterval);
        clearInterval(this.bombInterval);
        sounds.bomb.play();
        alert('Игра завершена');
        location.reload();
    }

    update(canvas, snake, board, size, sprites, sounds) {
        const callBack = () => this.gameStop(sounds);
        snake.move(board, callBack, sounds);
        canvas.render(size, sprites, board, snake, snake.score);
    }

    create(board, snake, size, sprites, sounds) {
        board.create(size, sprites);
        snake.create(board);
        board.createFood(snake);
        board.createBomd(snake);
    
        window.addEventListener('keydown', e => {
          if (e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40) {
            snake.start(e.keyCode, sounds);
          }
        });
    }
}