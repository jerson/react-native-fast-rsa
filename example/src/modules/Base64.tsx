import {Colors} from "react-native/Libraries/NewAppScreen";
import {Button, TextInput} from "react-native";
import React, {useState} from "react";
import RSA from 'react-native-fast-rsa';
import SectionContainer from "../components/SectionContainer";
import SectionTitle from "../components/SectionTitle";
import SectionResult from "../components/SectionResult";
import Container from "../components/Container";

interface Props {
    publicKey: string,
    privateKey: string,
    passphrase: string
}

export default function ({}: Props) {

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    return <Container testID={'base64'}>
        <SectionContainer testID={'container'}>
            <SectionTitle>Base64</SectionTitle>
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
                title={"Base64"}
                testID={'button'}
                onPress={async () => {
                    const output = await RSA.base64(
                        input,
                    );
                    setResult(output);
                }}
            />
            {!!result && <SectionResult testID={'result'}>{result}</SectionResult>}
        </SectionContainer>
    </Container>;
}