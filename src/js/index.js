// import styles
import '../scss/style.scss';
// import images files
import backgroundImg from '../assets/img/background.png';
import bodyImg from '../assets/img/body.png';
import bombImg from '../assets/img/bomb.png';
import cellImg from '../assets/img/cell.png';
import foodImg from '../assets/img/food.png';
import headImg from '../assets/img/head.png';
// import sounds files
import bombAudio from '../assets/sounds/bomb.mp3';
import foodAudio from '../assets/sounds/food.mp3';
import themeAudio from '../assets/sounds/theme.mp3';
// import classes
import Game from './classes/Game';

//****************** Создание переменных  **********************************/
const sprites = {
    background: backgroundImg,
    body: bodyImg,
    bomb: bombImg,
    cell: cellImg,
    food: foodImg,
    head: headImg
};

const sounds = {
    bomb: bombAudio,
    food: foodAudio,
    theme: themeAudio
};

const game = new Game(sprites, sounds);

/*********************** Запуск игры ******************************************************/
window.addEventListener("load", () => {
    game.start();
});