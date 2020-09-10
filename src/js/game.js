const game = {
  canvas: null,
  ctx: null,
  board: null,
  snake: null,
  gameInterval: null,
  bombInterval: null,
  score: 0,
  dimensions: {
    max: {
      width: 640,
      height: 360
    },
    min: {
      width: 300,
      height: 300
    }
  },
  size: {
    width: 0,
    height: 0
  },
  sprites: {
    background: null,
    cell: null,
    body: null,
    food: null,
    head: null,
    bomb: null
  },
  sounds: {
    bomb: null,
    food: null,
    theme: null
  },

  start() {
    this.init();
    this.preload(() => {
      this.run();
    });
  },

  init() {
    this.canvas = document.querySelector("#mycanvas");
    this.ctx = this.canvas.getContext("2d");
    this.initDemensions();
    this.setFont();
  },

  setFont() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "#FFFFFF";
  },

  initDemensions() {
    const data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight
    };

    if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
      this.fitWidth(data);
    } else {
      this.fitHeight(data)
    }

    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
  },

  fitHeight(data) {
    this.size.width = Math.floor(data.realWidth * data.maxHeight / data.realHeight);
    this.size.width = Math.min(this.size.width, data.maxWidth);
    this.size.width = Math.max(this.size.width, data.minWidth);
    this.size.height = Math.floor(this.size.width * data.realHeight / data.realWidth)
    this.canvas.style.height = "100%";
  },

  fitWidth(data) {
    this.size.height = Math.round(this.size.width * data.realHeight / data.realWidth);
    this.size.height = Math.min(this.size.height, data.maxHeight);
    this.size.height = Math.max(this.size.height, data.minHeight);
    this.size.width = Math.round(data.realWidth * this.size.height / data.realHeight);
    this.canvas.style.width = "100%";
  },

  preload(callBack) {
    const requiredSprites = Object.keys(this.sprites).length + Object.keys(this.sounds).length;
    let loaded = 0;

    const onAssetLoad = () => {
      ++loaded;
      if (loaded >= requiredSprites) {
        callBack();
      }
    };
    this.preloadSprites(onAssetLoad);
    this.preloadSounds(onAssetLoad);
  },

  preloadSprites(onAssetLoad) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `img/${key}.png`;
      this.sprites[key].addEventListener("load", onAssetLoad);
    }
  },

  preloadSounds(onAssetLoad) {
    for (let key in this.sounds) {
      this.sounds[key] = new Audio();
      this.sounds[key].src = `sounds/${key}.mp3`;
      this.sounds[key].addEventListener("canplaythrough", onAssetLoad, {once: true});
    }
  },

  run() {
    this.create();

    this.gameInterval = setInterval(() => {
      this.update();
    }, 150);

    this.bombInterval = setInterval(() => {
      if (this.snake.mooving) {
        this.board.createBomd();
      }
    }, 3000);
  },

  stop() {
    clearInterval(this.gameInterval);
    clearInterval(this.bombInterval);
    this.sounds.bomb.play();
    alert('Игра завершена');
    location.reload();
  },

  create() {
    this.board.create();
    this.snake.create();
    this.board.createFood();
    this.board.createBomd();

    window.addEventListener('keydown', e => {
      if (e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40) {
        this.snake.start(e.keyCode);
      }
    });
  },

  update() {
    this.snake.move();
    this.render();
  },

  render() {
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.size.width, this.size.height);
      this.ctx.drawImage(this.sprites.background, (this.size.width - this.sprites.background.width) / 2, (this.size.height - this.sprites.background.height) / 2);
      this.board.render();
      this.snake.render();
      this.ctx.fillText(`Score: ${this.score}`, 30, 30);
    });
  },

  random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  },

  onSnaceStart() {
    this.sounds.theme.loop = true;
    this.sounds.theme.play();
  },

  onSnakeEat() {
    this.score++;
    this.sounds.food.play();
    this.board.createFood();
  }

};


/************** запуск игры **************************/

window.addEventListener("load", () => {
  game.start();
});