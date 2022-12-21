import React, { ReactElement, useEffect, useState } from "react";
import { Button, Input } from "antd";
import { Rotor } from "../../model/rotor";
import { StringUtils } from "../../utils/string-utils";
import { DeleteOutlined } from "@ant-design/icons";

const initialPermutations: string[] = [
  "zyxwvutsrqponmlkjihgfedcba".toUpperCase(),
  "abcdefghijklmnopqrstuvwxyz".toUpperCase(),
];

export const RotorCipher = (): ReactElement => {
  const [permutations, setPermutations] = useState<string[]>(initialPermutations);
  const [rotations, setRotations] = useState<number[]>([5, 8]);
  const [rotors, setRotors] = useState<Rotor[]>([]);
  const [input, setInput] = useState<string>("Hello world".toUpperCase());
  const [encrypted, setEncrypted] = useState<string>("");
  const [decrypted, setDecrypted] = useState<string>("");

  const encrypt = (inputStr: string): string => {
    if (rotors.length === 0) {
      return "ERROR: No rotors defined.";
    }

    let output = inputStr;

    for (const rotor of rotors) {
      rotor.resetRotation();
      output = rotor.encrypt(output);
    }

    return output;
  };

  const decrypt = (inputStr: string): string => {
    if (rotors.length === 0) {
      return "";
    }

    let output = inputStr;

    for (let rotorIndex = rotors.length - 1; rotorIndex >= 0; rotorIndex--) {
      const rotor = rotors[rotorIndex];
      rotor.resetRotation();
      output = rotor.decrypt(output);
    }

    return output;
  };

  const setPermutation = (permutation: string, index: number): void => {
    let tmpPermutations = [...permutations];
    tmpPermutations[index] = permutation.toUpperCase();
    setPermutations(tmpPermutations);
  };

  const setRotation = (rotation: number, index: number): void => {
    let tmpRotations = [...rotations];
    tmpRotations[index] = rotation;
    setRotations(tmpRotations);
  };

  const addRotor = (): void => {
    let randomPermutation = "";

    do {
      randomPermutation = StringUtils.shuffle("abcdefghijklmnopqrstuvwxyz".toUpperCase());
    } while (permutations.includes(randomPermutation));

    const tmpRotations = [...rotations];
    tmpRotations.push(Math.floor(Math.random() * 25));
    setRotations(tmpRotations);
    const tmpPermutations = [...permutations];
    tmpPermutations.push(randomPermutation);
    setPermutations(tmpPermutations);
  };

  const removeRotor = (indexToDelete: number) => {
    const tmpPermutations = permutations.filter((permutation, index) => index !== indexToDelete);
    setPermutations(tmpPermutations);
    const tmpRotations = rotations.filter((rotation, index) => index !== indexToDelete);
    setRotations(tmpRotations);
  };

  useEffect(() => {
    const tmpRotors: Rotor[] = [];

    for (let permutationIndex = 0; permutationIndex < permutations.length; permutationIndex++) {
      const permutation = permutations[permutationIndex];

      if (permutation.length !== 26) {
        continue;
      }

      const rotation = rotations[permutationIndex];
      const rotor = new Rotor(permutation, rotation);
      tmpRotors.push(rotor);
    }

    setRotors(tmpRotors);
  }, [permutations, rotations]);

  useEffect(() => {
    setEncrypted(encrypt(input));
  }, [input, rotors]);

  useEffect(() => {
    setDecrypted(decrypt(encrypted));
  }, [encrypted]);

  return (
    <>
      <div className="content-input-label">Rotors</div>

      {permutations.map((permutation, index) => (
        <Input.Group key={`PERMUTATION-${index}`} style={{ marginTop: "0.25rem" }} compact>
          <Input
            style={{ width: "66%" }}
            value={permutation}
            onChange={(event) => setPermutation(event.target.value.toUpperCase(), index)}
          />
          <Input
            style={{ width: "20%" }}
            value={rotations[index]}
            type="number"
            onChange={(event) => setRotation(parseInt(event.target.value, 10), index)}
          />
          <Button
            style={{ width: "14%" }}
            type="primary"
            onClick={() => removeRotor(index)}
            danger
          >
            <DeleteOutlined />
          </Button>
        </Input.Group>
      ))}

      <Button style={{ width: "100%", marginTop: "1rem" }} onClick={() => addRotor()}>
        Add Rotor
      </Button>

      <div className="content-input-label">Input</div>
      <Input value={input} onChange={(event) => setInput(event.target.value.toUpperCase())} />

      <div className="content-input-label">Encrypted</div>
      <Input value={encrypted} readOnly />

      <div className="content-input-label">Decrypted</div>
      <Input value={decrypted} readOnly />
    </>
  );
};
