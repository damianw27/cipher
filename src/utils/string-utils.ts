export class StringUtils {
  public static readonly playfair = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  public static readonly dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  public static random(length: number): string {
    let result = "";

    for (let charIndex = 0; charIndex < length; charIndex++) {
      let randomChar = StringUtils.playfair.charAt(
        Math.floor(Math.random() * StringUtils.playfair.length),
      );

      if (result.includes(randomChar)) {
        charIndex = charIndex - 1;
        continue;
      }

      result += randomChar;
    }

    return result;
  }

  public static shuffle(inputStr: string): string {
    const characters = inputStr.split("");

    for (let currentCharIndex = characters.length - 1; currentCharIndex > 0; currentCharIndex--) {
      const newCharIndex = Math.floor(Math.random() * (currentCharIndex + 1));
      const tmp = characters[currentCharIndex];
      characters[currentCharIndex] = characters[newCharIndex];
      characters[newCharIndex] = tmp;
    }

    return characters.join("");
  }

  public static distinct(inputStr: string): string {
    let result = "";

    for (const character of inputStr) {
      if (result.includes(character)) {
        continue;
      }

      result += character;
    }

    return result;
  }
}
