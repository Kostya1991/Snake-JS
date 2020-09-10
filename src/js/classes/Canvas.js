export default class Canvas {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    canvasInit() {
        this.canvas = document.querySelector("#mycanvas");
        this.ctx = this.canvas.getContext("2d");
    }

    setFont() {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "#FFFFFF";
    }

    render(size, sprites, board, snake, score) {
        window.requestAnimationFrame(() => {
          this.ctx.clearRect(0, 0, size.width, size.height);
          this.ctx.drawImage(
              sprites.background, 
              (size.width - sprites.background.width) / 2, 
              (size.height - sprites.background.height) / 2
            );
          board.render(sprites, this.ctx);
          snake.render(this.ctx, sprites);
          this.ctx.fillText(`Score: ${score}`, 30, 30);
        });
      }
}