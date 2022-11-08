import React, { useEffect, useState } from "react";
import { Input, InputNumber } from "antd";

export function BaseCipher() {
  const [input, setInput] = useState<string>("");
  const [offset, setOffset] = useState<number>(3);
  const [encrypted, setEncrypted] = useState<string>("");
  const [decrypted, setDecrypted] = useState<string>("");

  const decodeCharCode = (charCode: number): number => {
    const newCharCode = charCode - offset;

    if (newCharCode < 65) {
      return newCharCode + 26;
    }

    return newCharCode;
  };

  const decode = (inputStr: string): string => {
    return inputStr
      .toUpperCase()
      .split("")
      .map((character) => character.charCodeAt(0))
      .map((charCode) => decodeCharCode(charCode))
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };

  const encodeCharCode = (charCode: number): number => {
    const newCharCode = charCode + offset;

    if (newCharCode > 90) {
      return newCharCode - 26;
    }

    return newCharCode;
  };

  const encode = (inputStr: string): string => {
    return inputStr
      .toUpperCase()
      .split("")
      .map((character) => character.charCodeAt(0))
      .map((charCode) => encodeCharCode(charCode))
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };

  useEffect(() => {
    setEncrypted(encode(input));
  }, [input, offset]);

  useEffect(() => {
    setDecrypted(decode(encrypted));
  }, [encrypted]);

  return (
    <>
      <div className="content-double-input-label-container">
        <div style={{ flex: 7 }}>Input</div>
        <div style={{ flex: 3 }}>Key</div>
      </div>
      <Input.Group compact>
        <Input
          style={{ width: "70%" }}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <InputNumber
          style={{ width: "30%" }}
          value={offset}
          onChange={(offsetValue) => setOffset(offsetValue ?? 0)}
        />
      </Input.Group>

      <div className="content-input-label">Encrypted</div>
      <Input value={encrypted} readOnly />

      <div className="content-input-label">Decrypted</div>
      <Input value={decrypted} readOnly />
    </>
  );
}
