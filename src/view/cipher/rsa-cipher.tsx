import React, {useEffect, useState} from "react";
import {Input, InputNumber} from "antd";

const A_CHAR_CODE = 'A'.charCodeAt(0);

const powerMod = (base: number, exponent: number, mod: number): number => {
    let result = 1;
    let nextBase = base;

    for (let i = exponent; i > 0; i /= 2) {
        if (i % 2 === 1) {
            result = (result * base) % mod;
        }

        nextBase = (nextBase * nextBase) % mod;
    }

    return result;
}

const encrypt = (inputStr: string, exponent: number, n: number): string => {
    const results: number[] = [];

    for (const char of inputStr) {
        const value = char.charCodeAt(0) - A_CHAR_CODE;
        results.push(powerMod(value, exponent, n));
    }

    return results.join(' ');
};

const decrypt = (inputStr: string, exponent: number, n: number): string => {
    const segments = inputStr.split(' ');
    let result = '';

    for (const segment of segments) {
        const segmentValue = parseInt(segment, 10);
        result += String.fromCharCode(powerMod(segmentValue, exponent, n) + A_CHAR_CODE);
    }

    return result;
};

export function RsaCipher() {
    const [input, setInput] = useState<string>("HELLO WORLD");
    const [exponent, setExponent] = useState<number>(10);
    const [iterationsCount, setIterationsCount] = useState<number>(100);
    const [encrypted, setEncrypted] = useState<string>("");
    const [decrypted, setDecrypted] = useState<string>("");

    useEffect(() => {
        setEncrypted(encrypt(input, exponent, iterationsCount));
    }, [input, exponent, iterationsCount]);

    useEffect(() => {
        setDecrypted(decrypt(encrypted, exponent, iterationsCount));
    }, [encrypted, exponent, iterationsCount]);

    return (
        <>
            <div className="content-input-label">Input</div>
            <Input value={input} onChange={(event) => setInput(event.target.value.toUpperCase())}/>

            <div className="content-double-input-label-container">
                <div style={{ flex: 1 }}>Exponent</div>
                <div style={{ flex: 1 }}>Iterations Count</div>
            </div>
            <Input.Group compact>
                <InputNumber
                    style={{ width: '50%' }}
                    value={exponent}
                    onChange={(value) => setExponent(value ?? 1)}
                />
                <InputNumber
                    style={{ width: '50%' }}
                    value={iterationsCount}
                    onChange={(value) => setIterationsCount(value ?? 1)}
                />
            </Input.Group>

            <div className="content-input-label">Encrypted</div>
            <Input value={encrypted} readOnly/>

            <div className="content-input-label">Validation Check</div>
            <small>{decrypted}</small>
        </>
    );
}
