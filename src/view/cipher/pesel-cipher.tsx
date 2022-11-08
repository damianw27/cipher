import React, { useEffect, useState } from "react";
import { Input, Radio } from "antd";
import { Gender } from "../../type/enum/gender";

export function PeselCipher() {
  const [input, setInput] = useState<string>("");
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [encrypted, setEncrypted] = useState<string>("");
  const [decrypted, setDecrypted] = useState<string>("");
  const [isValidGender, setIsValidGender] = useState<boolean>(false);

  const encode = (inputStr: string): string => {
    if (!/^[0-9]*$/.test(inputStr)) {
      return "error: invalid input provided";
    }

    if (inputStr.length !== 10) {
      return "error: invalid length of input";
    }

    let multiply = 1;
    let result = 0;

    for (const character of inputStr.toUpperCase().split("")) {
      const num = parseInt(character, 10);

      result += num * multiply;
      multiply = (multiply + 2) % 10;

      if (multiply === 5) {
        multiply = 7;
      }
    }

    return `${inputStr}${10 - (result % 10)}`;
  };

  const decode = (inputStr: string): string => {
    if (!/^[0-9]*$/.test(inputStr)) {
      return "error: invalid input provided";
    }

    if (inputStr.length !== 11) {
      return "error: invalid length of input";
    }

    const encodedPesel = encode(inputStr.substring(0, 10));

    if (encodedPesel === inputStr) {
      return "Given PESEL is valid";
    }

    return "Given PESEL is invalid";
  };

  useEffect(() => {
    setEncrypted(encode(input));
  }, [input]);

  useEffect(() => {
    setDecrypted(decode(encrypted));
  }, [encrypted]);

  useEffect(() => {
    if (encrypted.length !== 11) {
      setIsValidGender(false);
      return;
    }

    const genderNumber = parseInt(encrypted.substring(9, 10), 10);
    const estimatedGender = genderNumber % 2 === 0 ? Gender.Female : Gender.Male;
    setIsValidGender(estimatedGender === gender);
  }, [encrypted, gender]);

  return (
    <>
      <div className="content-input-label">Input</div>
      <Input value={input} onChange={(event) => setInput(event.target.value)} />

      <div className="content-input-label">Gender</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Radio.Group
          options={[
            {
              label: "Male",
              value: Gender.Male,
            },
            {
              label: "Female",
              value: Gender.Female,
            },
          ]}
          onChange={(event) => setGender(event.target.value)}
          value={gender}
          optionType="button"
          buttonStyle="solid"
        />
      </div>

      <div className="content-input-label">Encrypted</div>
      <Input value={encrypted} readOnly />

      <div className="content-input-label">Validation Check</div>
      <small>{decrypted}</small>

      <div className="content-input-label">Is Valid Gender</div>
      <small>
        {isValidGender
          ? "Provided PESEL reflects selected gender"
          : "Provided PESEL not reflects selected gender"}
      </small>
    </>
  );
}
