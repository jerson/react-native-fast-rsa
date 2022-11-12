import {Colors} from "react-native/Libraries/NewAppScreen";
import {Button, TextInput} from "react-native";
import React, {useState} from "react";
import RSA, { Hash } from 'react-native-fast-rsa';
import SectionContainer from "../components/SectionContainer";
import SectionTitle from "../components/SectionTitle";
import SectionResult from "../components/SectionResult";
import Container from "../components/Container";

interface Props {
    publicKey: string,
    privateKey: string,
    passphrase: string
}

export default function ({publicKey, privateKey}: Props) {

    const [input, setInput] = useState('');
    const [encrypted, setEncrypted] = useState('');
    const [decrypted, setDecrypted] = useState(new Uint8Array());

    return <Container testID={'encrypt-decrypt-oaep'}>
        <SectionContainer testID={'encrypt'}>
            <SectionTitle>Encrypt OAEP</SectionTitle>
            <TextInput
                value={input}
                testID={'message'}
                onChangeText={(text) => {
                    setInput(text);
                }}
                style={{backgroundColor: Colors.white, borderRadius: 4}}
                placeholder={"insert message here"}
            />
            <Button
                title={"Encrypt"}
                testID={'button'}
                onPress={async () => {
                    const output = await RSA.encryptOAEP(input,"sample",Hash.SHA256, publicKey);
                    setEncrypted(output);
                }}
            />
            {!!encrypted && <SectionResult testID={'result'}>{encrypted}</SectionResult>}
        </SectionContainer>
        {!!encrypted && (
            <SectionContainer testID={'decrypt'}>
                <SectionTitle>Decrypt OAEP</SectionTitle>
                <Button
                    title={"Decrypt"}
                    testID={'button'}
                    onPress={async () => {
                        const output = await RSA.decryptOAEP(
                            encrypted,
                            "sample",
                            Hash.SHA256,
                            privateKey
                        );
                        setDecrypted(output);
                    }}
                />
                {!!decrypted && (
                    <SectionResult testID={'result'}>
                        {decrypted}
                    </SectionResult>
                )}
            </SectionContainer>
        )}
    </Container>;
}
