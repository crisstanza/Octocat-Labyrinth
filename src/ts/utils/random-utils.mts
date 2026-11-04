export class RandomUtils {
  randBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randBoolean(): boolean {
    return this.randBetween(0, 1) == 0;
  }
}
