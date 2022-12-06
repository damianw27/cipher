import { StringUtils } from "../utils/string-utils";

export class HomophonicDictionary {
  public static createWithRandomApproach() {
    const usedChars: string[] = [];
    const dictionary: string[][] = [];

    let secretCharIndex = 0;

    while (secretCharIndex < 93) {
      const secretChar = String.fromCharCode(secretCharIndex + 33);
      const charIndex = Math.floor(Math.random() * StringUtils.dictionary.length);

      if (
        StringUtils.dictionary.charAt(charIndex) === secretChar ||
        usedChars.includes(secretChar)
      ) {
        continue;
      }

      if (dictionary[charIndex] === undefined) {
        dictionary[charIndex] = [];
      }

      dictionary[charIndex].push(secretChar);
      usedChars.push(secretChar);
      secretCharIndex += 1;
    }

    console.table(dictionary);

    return new HomophonicDictionary(dictionary);
  }

  public static createWithOrdering(): HomophonicDictionary {
    const dictionary: string[][] = [];

    for (let i = 0; i < StringUtils.dictionary.length; i++) {
      dictionary[i] = [0, 1, 2].map((offset) => String.fromCharCode(33 + i + 26 * offset));
    }

    console.table(dictionary);

    return new HomophonicDictionary(dictionary);
  }

  private readonly dictionary: string[][];

  private constructor(dictionary: string[][]) {
    this.dictionary = dictionary;
  }

  public getSecretChar(character: string): string {
    const charCode = StringUtils.dictionary.indexOf(character);
    const secretChars = this.dictionary[charCode];

    if (secretChars === undefined || secretChars.length === 0) {
      return character;
    }

    const secretCharCode = Math.floor(Math.random() * secretChars.length);
    return secretChars[secretCharCode];
  }

  public getNormalChar(secretCharacter: string): string {
    for (let i = 0; i < StringUtils.dictionary.length; i++) {
      const secretCharacters = this.dictionary[i];

      if (secretCharacters === undefined || !secretCharacters.includes(secretCharacter)) {
        continue;
      }

      return StringUtils.dictionary.charAt(i);
    }

    return secretCharacter;
  }
}
