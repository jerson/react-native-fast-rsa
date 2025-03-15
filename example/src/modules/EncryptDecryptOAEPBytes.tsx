import {Colors} from "react-native/Libraries/NewAppScreen";
import {Button, TextInput} from "react-native";
import React, {useState} from "react";
import RSA, { Hash } from 'react-native-fast-rsa';
import SectionContainer from "../components/SectionContainer";
import SectionTitle from "../components/SectionTitle";
import SectionResult from "../components/SectionResult";
import Container from "../components/Container";
import { base64Encode, uint8ArrayToString } from "../utils/codecs";

interface Props {
    publicKey: string,
    privateKey: string,
    passphrase: string
}

export default function ({publicKey, privateKey}: Props) {

    const [input, setInput] = useState<Uint8Array | undefined>();
    const [encrypted, setEncrypted] = useState<Uint8Array | undefined>();
    const [decrypted, setDecrypted] = useState<Uint8Array | undefined>();

    return <Container testID={'encrypt-decrypt-oaep-bytes'}>
        <SectionContainer testID={'encrypt'}>
            <SectionTitle>Encrypt OAEP Bytes</SectionTitle>
            <TextInput
                testID={'message'}
                onChangeText={(text) => {
                    const encoded = new global.TextEncoder().encode(text);
                    setInput(encoded);
                }}
                style={{backgroundColor: Colors.white, borderRadius: 4}}
                placeholder={"insert message here"}
            />
            <Button
                title={"Encrypt"}
                testID={'button'}
                onPress={async () => {
                    if (!input) {
                        return;
                    }
                    const output = await RSA.encryptOAEPBytes(input,"sample",Hash.SHA256, publicKey);
                    setEncrypted(output);
                }}
            />
            {!!encrypted && (
                <SectionResult testID={'result-raw'}>
                    bytes: {encrypted.join(", ")}
                </SectionResult>
            )}
            {!!encrypted && (
                <SectionResult testID={'result'}>
                    base64: {base64Encode(encrypted)}
                </SectionResult>
            )}
        </SectionContainer>
        {!!encrypted && (
            <SectionContainer testID={'decrypt'}>
                <SectionTitle>Decrypt OAEP Bytes</SectionTitle>
                <Button
                    title={"Decrypt"}
                    testID={'button'}
                    onPress={async () => {
                        const output = await RSA.decryptOAEPBytes(
                            encrypted,
                            "sample",
                            Hash.SHA256,
                            privateKey
                        );
                        setDecrypted(output);
                    }}
                />
                {!!decrypted && (
                    <SectionResult testID={'result-raw'}>
                        bytes: {decrypted.join(", ")}
                    </SectionResult>
                )}
                {!!decrypted && (
                    <SectionResult testID={'result'}>
                        decoded: {uint8ArrayToString(decrypted)}
                    </SectionResult>
                )}
            </SectionContainer>
        )}
    </Container>;
}
