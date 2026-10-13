export class RandomUtils {
    randBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    randBoolean() {
        return this.randBetween(0, 1) == 0;
    }
}
