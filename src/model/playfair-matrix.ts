import { StringUtils } from "../utils/string-utils";

export class PlayfairMatrix {
  public static create(keyword: string, width = 5): PlayfairMatrix {
    const prefix = keyword.toUpperCase().replace(/J/g, "I").replace(/ /g, "");
    const characters = `${prefix}${StringUtils.dictionary}`;
    const valuesStr = StringUtils.distinct(characters);
    const values = this.getStrAsGrid(valuesStr, width);
    return new PlayfairMatrix(keyword, values, width);
  }

  public static createRandom(width = 5): PlayfairMatrix {
    const randomStr = StringUtils.random(8);
    const values = this.getStrAsGrid(randomStr, width);
    return new PlayfairMatrix(randomStr, values, width);
  }

  private static getStrAsGrid(inputStr: string, width: number): string[][] {
    const values: string[][] = [];

    for (let rowIndex = 0; rowIndex < width; rowIndex++) {
      values[rowIndex] = inputStr.substring(rowIndex * width, rowIndex * width + width).split("");
    }

    return values;
  }

  private readonly keyword: string;
  private readonly values: string[][];
  private readonly width: number;

  private constructor(keyword: string, values: string[][], width = 5) {
    this.keyword = keyword;
    this.values = values;
    this.width = width;
  }

  public getCharAt(x: number, y: number): string {
    return this.values[x][y];
  }

  public setCharAt(x: number, y: number, character: string): void {
    this.values[x][y] = character;
  }

  public isValid(): boolean {
    return this.values.length * this.values[0].length === this.width * this.width;
  }

  public print(): void {
    console.table(this.values);
  }

  public get currentKeyword(): string {
    return this.keyword;
  }

  public get currentValue(): string {
    return this.values.map((chars) => chars.join("")).join(" ");
  }

  public get currentWidth(): number {
    return this.width;
  }
}
