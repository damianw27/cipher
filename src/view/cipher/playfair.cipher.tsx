import React, { ReactElement, useEffect, useState } from "react";
import { Input } from "antd";
import { PlayfairMatrix } from "../../model/playfair-matrix";
import { StringUtils } from "../../utils/string-utils";

export const PlayfairCipher = (): ReactElement => {
  const [keyword, setKeyword] = useState<string>("");
  const [playfairMatrix, setPlayfairMatrix] = useState<PlayfairMatrix>(
    PlayfairMatrix.createRandom(),
  );
  const [input, setInput] = useState<string>("UNIWERSYTETXTX");
  const [encrypted, setEncrypted] = useState<string>("");
  const [decrypted, setDecrypted] = useState<string>("");

  const findCharIndexPair = (inputStr: string, matrix: PlayfairMatrix): Record<string, number> => {
    if (!matrix.isValid()) {
      return { i: 0, j: 0 };
    }

    for (let i = 0; i < matrix.currentWidth; i++) {
      for (let j = 0; j < matrix.currentWidth; j++) {
        if (inputStr !== matrix.getCharAt(i, j)) {
          continue;
        }

        return { i, j };
      }
    }

    throw new Error(`Unable to find index pair for char ${inputStr} in matrix`);
  };

  const encrypt = (inputStr: string, matrix: PlayfairMatrix): string => {
    let tmpInputStr = inputStr;
    let encodedStr = "";

    if (inputStr.length % 2 === 1) {
      tmpInputStr += StringUtils.random(1);
    }

    try {
      for (let i = 0; i < tmpInputStr.length; i += 2) {
        const char1 = findCharIndexPair(tmpInputStr[i], matrix);
        const char2 = findCharIndexPair(tmpInputStr[i + 1], matrix);

        if (char1.i === char2.i && char1.j === char2.j) {
          encodedStr += `${matrix.getCharAt(char1.i, char1.j)}X`;
        } else if (char1.j === char2.j) {
          encodedStr += matrix.getCharAt(char1.i, (char1.j + 1) % matrix.currentWidth);
          encodedStr += matrix.getCharAt(char2.i, (char2.j + 1) % matrix.currentWidth);
        } else if (char1.i === char2.i) {
          encodedStr += matrix.getCharAt((char1.i + 1) % matrix.currentWidth, char1.j);
          encodedStr += matrix.getCharAt((char2.i + 1) % matrix.currentWidth, char2.j);
        } else {
          encodedStr += matrix.getCharAt(char1.i, char2.j);
          encodedStr += matrix.getCharAt(char2.i, char1.j);
        }
      }
    } catch (error) {
      console.error(error);
      return "ERROR: Unable to encrypt string";
    }

    return encodedStr;
  };

  const decrypt = (inputStr: string, matrix: PlayfairMatrix): string => {
    let tmpInputStr = inputStr;
    let decodedStr = "";

    try {
      for (let i = 0; i < tmpInputStr.length; i += 2) {
        const char1 = findCharIndexPair(tmpInputStr[i], matrix);
        const char2 = findCharIndexPair(tmpInputStr[i + 1], matrix);

        if (char1.i === char2.i && char1.j === char2.j) {
          decodedStr += `${matrix.getCharAt(char1.i, char1.j)}X`;
        } else if (char1.j === char2.j) {
          decodedStr += matrix.getCharAt(
            char1.i,
            (matrix.currentWidth + char1.j - 1) % matrix.currentWidth,
          );
          decodedStr += matrix.getCharAt(
            char2.i,
            (matrix.currentWidth + char2.j - 1) % matrix.currentWidth,
          );
        } else if (char1.i === char2.i) {
          decodedStr += matrix.getCharAt(
            (matrix.currentWidth + char1.i - 1) % matrix.currentWidth,
            char1.j,
          );
          decodedStr += matrix.getCharAt(
            (matrix.currentWidth + char2.i - 1) % matrix.currentWidth,
            char2.j,
          );
        } else {
          decodedStr += matrix.getCharAt(char1.i, char2.j);
          decodedStr += matrix.getCharAt(char2.i, char1.j);
        }
      }
    } catch (error) {
      console.error(error);
      return "ERROR: Unable to decrypt string";
    }

    return decodedStr;
  };

  useEffect(() => {
    const matrix = PlayfairMatrix.createRandom();
    setKeyword(matrix.currentKeyword);
    setPlayfairMatrix(matrix);
  }, []);

  useEffect(() => {
    const matrix = PlayfairMatrix.create(keyword, 5);
    setPlayfairMatrix(matrix);
  }, [keyword]);

  useEffect(() => {
    setEncrypted(encrypt(input, playfairMatrix));
  }, [input, playfairMatrix]);

  useEffect(() => {
    setDecrypted(decrypt(encrypted, playfairMatrix));
  }, [encrypted]);

  return (
    <>
      <div className="content-input-label">Keyword</div>
      <Input value={keyword} onChange={(event) => setKeyword(event.target.value.toUpperCase())} />

      <div className="content-input-label">Input</div>
      <Input value={input} onChange={(event) => setInput(event.target.value.toUpperCase())} />

      <div className="content-input-label">Encrypted</div>
      <Input value={encrypted} readOnly />

      <div className="content-input-label">Decrypted</div>
      <Input value={decrypted} readOnly />
    </>
  );
};
