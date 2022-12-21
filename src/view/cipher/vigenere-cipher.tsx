import React, { ReactElement, useEffect, useState } from "react";
import { Input } from "antd";

export const VigenereCipher = (): ReactElement => {
  const [keyword, setKeyword] = useState<string>("BARAN");
  const [input, setInput] = useState<string>("ABERACJA");
  const [encrypted, setEncrypted] = useState<string>("");
  const [decrypted, setDecrypted] = useState<string>("");

  const getDictionary = (inputStr: string, words: string): string =>
    inputStr
      .split("")
      .map((_, index) => words[index % words.length])
      .join("");

  const encrypt = (inputStr: string, dictionary: string): string =>
    inputStr
      .split("")
      .map((char, index) => (char.charCodeAt(0) + dictionary.charCodeAt(index)) % 26)
      .map((charCode) => charCode + 65)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");

  const decrypt = (inputStr: string, dictionary: string): string =>
    inputStr
      .split("")
      .map((char, index) => (char.charCodeAt(0) - dictionary.charCodeAt(index)) % 26)
      .map((charCode) => charCode + 65)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");

  useEffect(() => {
    const dictionary = getDictionary(input, keyword);
    setEncrypted(encrypt(input, dictionary));
  }, [input, keyword]);

  useEffect(() => {
    const dictionary = getDictionary(input, keyword);
    setDecrypted(decrypt(encrypted, dictionary));
  }, [encrypted, keyword]);

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
