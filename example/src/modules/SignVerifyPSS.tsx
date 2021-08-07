import {Colors} from "react-native/Libraries/NewAppScreen";
import {Button, TextInput} from "react-native";
import React, {useState} from "react";
import RSA, { Hash, SaltLength } from 'react-native-fast-rsa';
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
    const [signed, setSigned] = useState('');
    const [verified, setVerified] = useState(false);

    return <Container testID={'sign-verify-pss'}>
        <SectionContainer testID={'sign'}>
            <SectionTitle>Sign PSS</SectionTitle>
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
                title={"Sign"}
                testID={'button'}
                onPress={async () => {
                    const output = await RSA.signPSS(
                        input,
                        Hash.SHA224,
                        SaltLength.AUTO,
                        privateKey
                    );
                    setSigned(output);
                }}
            />
            {!!signed && <SectionResult testID={'result'}>{signed}</SectionResult>}
        </SectionContainer>
        {!!signed && (
            <SectionContainer testID={'verify'}>
                <SectionTitle>Verify PSS</SectionTitle>
                <Button
                    title={"Verify"}
                    testID={'button'}
                    onPress={async () => {
                        const output = await RSA.verifyPSS(
                            signed,
                            input,
                            Hash.SHA224,
                            SaltLength.AUTO,
                            publicKey
                        );

                        setVerified(output);
                    }}
                />
                {typeof verified !== 'undefined' && (
                    <SectionResult testID={'result'}>
                        {verified ? 'valid' : 'invalid'}
                    </SectionResult>
                )}
            </SectionContainer>
        )}
    </Container>;
}