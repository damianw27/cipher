import React, { useState } from "react";
import { Layout, Select } from "antd";
import "./app-view.css";
import { CipherType } from "../type/enum/cipher-type";
import { BaseCipher } from "./cipher/base-cipher";
import { PeselCipher } from "./cipher/pesel-cipher";
import { IbanCipher } from "./cipher/iban-cipher";

const { Content, Footer } = Layout;
const { Option } = Select;

function AppView() {
  const [method, setMethod] = useState<CipherType>(CipherType.Basic);

  return (
    <>
      <Content className="content-wrapper">
        <div className="content-layout">
          <div className="content-input-label">Method</div>
          <Select style={{ width: "100%" }} value={method} onChange={(value) => setMethod(value)}>
            <Option value={CipherType.Basic}>Basic</Option>
            <Option value={CipherType.Pesel}>PESEL</Option>
            <Option value={CipherType.Iban}>IBAN</Option>
          </Select>

          {method === CipherType.Basic && <BaseCipher />}
          {method === CipherType.Pesel && <PeselCipher />}
          {method === CipherType.Iban && <IbanCipher />}
        </div>
      </Content>
      <Footer className="content-footer">Damian Wileński © 2022</Footer>
    </>
  );
}

export default AppView;
