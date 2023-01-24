import React, {useEffect, useState} from "react";
import {Input} from "antd";

export function HammingCipher() {
    const [input, setInput] = useState<string>("1001");
    const [errors, setErrors] = useState<string[]>([]);
    const [encrypted, setEncrypted] = useState<string>("");
    const [decrypted, setDecrypted] = useState<string>("");

    const encrypt = (inputStr: string): string => {
        if (!/^10*$/.test(inputStr) && inputStr.length % 4 !== 0) {
            return "error: invalid input provided";
        }

        let result = '';

        for (let segmentIndex = 0; segmentIndex < inputStr.length; segmentIndex += 4) {
            const segment = inputStr.substring(segmentIndex, 4);

            const segmentParts: number[] = [];

            segmentParts[2] = parseInt(segment[0], 10);
            segmentParts[4] = parseInt(segment[1], 10);
            segmentParts[5] = parseInt(segment[2], 10);
            segmentParts[6] = parseInt(segment[3], 10);
            segmentParts[0] = segmentParts[2] ^ segmentParts[4] ^ segmentParts[6];
            segmentParts[1] = segmentParts[2] ^ segmentParts[5] ^ segmentParts[6];
            segmentParts[3] = segmentParts[4] ^ segmentParts[5] ^ segmentParts[6];

            result += segmentParts.join('');
        }

        return result;
    };

    const decrypt = (inputStr: string): string => {
        if (!/^10*$/.test(inputStr) && inputStr.length % 7 !== 0) {
            return "error: invalid input provided";
        }

        const tmpErrors: string[] = [];

        let result = '';

        for (let segmentIndex = 0; segmentIndex < inputStr.length; segmentIndex += 7) {
            const segment = inputStr.substring(segmentIndex, 7);

            const resultSegmentParts: number[] = [];

            for (let segmentPartIndex = 0; segmentPartIndex < segment.length; segmentPartIndex += 1) {
                resultSegmentParts[segmentPartIndex] = parseInt(segment[segmentPartIndex], 10);
            }

            const sErrors: number[] = [];

            sErrors[0] = resultSegmentParts[0] ^ resultSegmentParts[2] ^ resultSegmentParts[4] ^ resultSegmentParts[6];
            sErrors[1] = resultSegmentParts[1] ^ resultSegmentParts[2] ^ resultSegmentParts[5] ^ resultSegmentParts[6];
            sErrors[2] = resultSegmentParts[3] ^ resultSegmentParts[4] ^ resultSegmentParts[5] ^ resultSegmentParts[6];

            const errorPosition = sErrors[0] + Math.pow(sErrors[1], 1) + Math.pow(sErrors[2], 2);

            if (errorPosition !== 0) {
                let errorIndex = 7 - errorPosition;

                if (sErrors[errorIndex] === 0) {
                    tmpErrors.push(`Found error at ${errorIndex}. Changed value from 0 to 1`);
                    resultSegmentParts[errorIndex] = 1;
                } else {
                    tmpErrors.push(`Found error at ${errorIndex}. Changed value from 1 to 0`);
                    resultSegmentParts[errorIndex] = 0;
                }
            }

            let resultSegment = '';

            for (let segmentPartIndex = 0; segmentPartIndex < segment.length; segmentPartIndex += 1) {
                resultSegment += `${resultSegmentParts[segmentPartIndex]}`;
            }

            result += resultSegment;
        }

        setErrors(tmpErrors);
        return result;
    };

    useEffect(() => {
        setEncrypted(encrypt(input));
    }, [input]);

    useEffect(() => {
        setDecrypted(decrypt(encrypted));
    }, [encrypted]);

    return (
        <>
            <div className="content-input-label">Input</div>
            <Input value={input} onChange={(event) => setInput(event.target.value)}/>

            <div className="content-input-label">Encrypted</div>
            <Input value={encrypted} readOnly/>

            <div className="content-input-label">Validation Check</div>
            <small>{decrypted}</small>

            <div className="content-input-label">Errors</div>

            {
                errors.length === 0
                    ? <div>No errors found!</div>
                    : <ul>{errors.map((errorMessage, index) => <li key={`error-${index}`}>{errorMessage}</li>)}</ul>
            }
        </>
    );
}
