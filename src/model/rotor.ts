import { StringUtils } from "../utils/string-utils";

const ALPHABET_LENGTH = 26;

const A_CHAR = "A";
const Z_CHAR = "Z";
const A_CHAR_CODE = A_CHAR.charCodeAt(0);

export class Rotor {
  private readonly permutation: string[];
  private readonly initialRotation: number;
  private rotation: number;

  public constructor(permutation: string, initialRotation: number) {
    this.permutation = StringUtils.distinct(permutation).split("");
    this.initialRotation = initialRotation % ALPHABET_LENGTH;
    this.rotation = this.initialRotation;

    if (this.permutation.length !== ALPHABET_LENGTH) {
      throw new Error(
        "Invalid permutation provided to rotor. Permutation needs to have all letters from alphabet.",
      );
    }
  }

  public encrypt = (inputStr: string): string =>
    inputStr
      .split("")
      .map((char) => this.selectForwardPermutation(char))
      .join("");

  public decrypt = (message: string): string =>
    message
      .split("")
      .map((char) => this.selectReversePermutation(char))
      .join("");

  public setRotation = (rotation: number): void => {
    this.rotation = rotation % ALPHABET_LENGTH;
  };

  public resetRotation = (): void => {
    this.rotation = this.initialRotation;
  };

  private selectForwardPermutation = (char: string): string => {
    if (!(char >= A_CHAR && char <= Z_CHAR)) {
      return char;
    }

    const alphabetIndex = char.charCodeAt(0) - A_CHAR_CODE;
    const rotatedAlphabetIndex = (alphabetIndex + this.rotation) % ALPHABET_LENGTH;
    const encryptedLetter = this.permutation[rotatedAlphabetIndex];
    this.rotation = (this.rotation + 1) % ALPHABET_LENGTH;
    return encryptedLetter;
  };

  private selectReversePermutation = (char: string): string => {
    if (!(char >= A_CHAR && char <= Z_CHAR)) {
      return char;
    }

    const permutationIndex = this.permutation.indexOf(char);
    const rotatedPermutationIndex =
      (permutationIndex - this.rotation + ALPHABET_LENGTH) % ALPHABET_LENGTH;
    const decryptedLetter = String.fromCharCode(A_CHAR_CODE + rotatedPermutationIndex);
    this.rotation = (this.rotation + 1) % this.permutation.length;
    return decryptedLetter;
  };
}
