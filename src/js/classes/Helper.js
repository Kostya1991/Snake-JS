export default class Helper {

    random(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
}