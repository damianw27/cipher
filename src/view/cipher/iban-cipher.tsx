import React, { ReactElement, useEffect, useState } from "react";
import { Input } from "antd";

const charValues: Record<string, number> = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 18,
  J: 19,
  K: 20,
  L: 21,
  M: 22,
  N: 23,
  O: 24,
  P: 25,
  Q: 26,
  R: 27,
  S: 28,
  T: 29,
  U: 30,
  V: 31,
  W: 32,
  X: 33,
  Y: 34,
  Z: 35,
};

export const IbanCipher = (): ReactElement => {
  const [input, setInput] = useState<string>("PL 00 1140 2004 0000 1234 5678 9012");
  const [encrypted, setEncrypted] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const countSumOfDigits = (accountNumber: string): number => {
    let sumOfDigits = 0;

    for (const accountNumberElement of accountNumber) {
      const currentDigit = parseInt(accountNumberElement, 10);
      sumOfDigits = 10 * sumOfDigits + currentDigit;
      sumOfDigits = sumOfDigits % 97;
    }

    return sumOfDigits;
  };

  const countChecksum = (accountNumber: string): number => {
    return 98 - countSumOfDigits(accountNumber);
  };

  const encrypt = (inputStr: string): string => {
    let accountNumberStr = inputStr.trim().replaceAll(" ", "");

    const accountNumberStartSigns = accountNumberStr
      .substring(0, 4)
      .split("")
      .map((char) => `${charValues[char] ?? char}`)
      .join("");

    const countrySign = accountNumberStr.substring(0, 2);
    const accountNumberRest = accountNumberStr.substring(4);
    const accountNumber = `${accountNumberRest}${accountNumberStartSigns}`;
    const checksum = countChecksum(accountNumber);
    return `${countrySign} ${checksum} ${accountNumberRest}`;
  };

  const check = (inputStr: string): boolean => {
    let accountNumberStr = inputStr.trim().replaceAll(" ", "");

    const accountNumberStartSigns = accountNumberStr
      .substring(0, 4)
      .split("")
      .map((char) => `${charValues[char] ?? char}`)
      .join("");

    const accountNumberRest = accountNumberStr.substring(4);
    const accountNumber = `${accountNumberRest}${accountNumberStartSigns}`;
    return countSumOfDigits(accountNumber) % 97 === 1;
  };

  useEffect(() => {
    setEncrypted(encrypt(input));
  }, [input]);

  useEffect(() => {
    setIsValid(check(encrypted));
  }, [encrypted]);

  return (
    <>
      <div className="content-input-label">Input</div>
      <Input value={input} onChange={(event) => setInput(event.target.value)} />

      <div className="content-input-label">Encrypted</div>
      <Input value={encrypted} readOnly />

      <div className="content-input-label">Validation Check</div>
      <small>{isValid ? "IBAN is valid" : "IBAN is invalid"}</small>
    </>
  );
};
