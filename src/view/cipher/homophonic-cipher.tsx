import React, { useEffect, useState } from "react";
import { Input, Radio } from "antd";
import { HomophonicDictionary } from "../../model/homophonic-dictionary";

export function HomophonicCipher() {
  const [input, setInput] = useState<string>("");
  const [useRandomApproach, setUseRandomApproach] = useState<boolean>(false);
  const [dictionary, setDictionary] = useState<HomophonicDictionary>();
  const [encrypted, setEncrypted] = useState<string>("");
  const [decrypted, setDecrypted] = useState<string>("");

  const encode = (inputStr: string, currentDictionary: HomophonicDictionary): string =>
    inputStr
      .split("")
      .map((char) => currentDictionary.getSecretChar(char))
      .join("");

  const decode = (inputStr: string, currentDictionary: HomophonicDictionary): string =>
    inputStr
      .split("")
      .map((char) => currentDictionary.getNormalChar(char))
      .join("");

  useEffect(() => {
    if (dictionary === undefined) {
      return;
    }

    setEncrypted(encode(input, dictionary));
  }, [input, dictionary]);

  useEffect(() => {
    if (dictionary === undefined) {
      return;
    }

    setDecrypted(decode(encrypted, dictionary));
  }, [encrypted]);

  useEffect(() => {
    let homophonicDictionary = useRandomApproach
      ? HomophonicDictionary.createWithRandomApproach()
      : HomophonicDictionary.createWithOrdering();

    setDictionary(homophonicDictionary);
  }, [useRandomApproach]);

  return (
    <>
      <div className="content-input-label">Input</div>
      <Input value={input} onChange={(event) => setInput(event.target.value)} />

      <div className="content-input-label">Version</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Radio.Group
          options={[
            {
              label: "Take Random ITEM",
              value: true,
            },
            {
              label: "Keep Order",
              value: false,
            },
          ]}
          onChange={(event) => setUseRandomApproach(event.target.value)}
          value={useRandomApproach}
          optionType="button"
          buttonStyle="solid"
        />
      </div>

      <div className="content-input-label">Encrypted</div>
      <Input value={encrypted} readOnly />

      <div className="content-input-label">Decrypted</div>
      <Input value={decrypted} readOnly />
    </>
  );
}
