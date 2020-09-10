import Snake from './Snake';
import Board from './Board'
import Preload from './Preload'
import Canvas from './Canvas';
import GameSettings from './GameSettings';
import GameRunner from './GameRunner';

const DIMENSIONS = {
    max: {
      width: 640,
      height: 360
    },
    min: {
      width: 300,
      height: 300
    }
};

const SIZE = {
    width: 0,
    height: 0
};

export default class Game {
    constructor (sprites, sounds) {
        this.sprites = sprites;
        this.sounds = sounds;
        this.canvas = new Canvas(null, null);
        this.gameSettings = new GameSettings(SIZE, DIMENSIONS);
        this.gameRunner = new GameRunner(null, null);
        this.snake = new Snake([], false, null);
        this.board = new Board(15, []);
    }

    start() {
        this.init();
        const callBackRun = () => this.run();
        Preload.preload(callBackRun, this.sprites, this.sounds);
    }
    
    init() {
        this.canvas.canvasInit();
        this.gameSettings.initDemensions(this.canvas);
        this.canvas.setFont();
    }
    
    run() {
        this.gameRunner.create(
            this.board, 
            this.snake, 
            this.gameSettings, 
            this.sprites, 
            this.sounds,

        );
        this.gameRunner.gameRun(
            this.canvas, 
            this.snake, 
            this.board, 
            this.gameSettings.size, 
            this.sprites,
            this.sounds
        );
    }
}