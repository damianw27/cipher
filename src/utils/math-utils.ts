export class MathUtils {
  public static randomInt(start: number, end: number) {
    const randomValue = Math.floor(Math.random() * (end - start + 1));
    return randomValue + start;
  }
}
