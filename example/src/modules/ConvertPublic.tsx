import {Button} from "react-native";
import React, {useState} from "react";
import RSA   from 'react-native-fast-rsa';
import SectionContainer from "../components/SectionContainer";
import SectionTitle from "../components/SectionTitle";
import SectionResult from "../components/SectionResult";
import Container from "../components/Container";

interface Props {
    publicKey: string,
    privateKey: string,
    passphrase: string
}

export default function ({publicKey}: Props) {

    const [jwt, setJWT] = useState('');
    const [pkcs1, setPKCS1] = useState('');
    const [pkix, setPKIX] = useState('');
    
    return <Container testID={'convert-public'}>
        <SectionContainer testID={'container'}>
            <SectionTitle>Convert PublicKey</SectionTitle>
            <Button
                title={"To JWT"}
                testID={'jwt'}
                onPress={async () => {
                    const output = await RSA.convertPublicKeyToJWK(
                        publicKey
                    );
                    setJWT(JSON.stringify(output));
                }}
            />
            {!!jwt && <SectionResult testID={'result_jwt'}>{jwt}</SectionResult>}
            <Button
                title={"To PKCS1"}
                testID={'pkcs1'}
                onPress={async () => {
                    const output = await RSA.convertPublicKeyToPKCS1(
                        publicKey
                    );
                    setPKCS1(output);
                }}
            />
            {!!jwt && <SectionResult testID={'result_pkcs1'}>{pkcs1}</SectionResult>}
            <Button
                title={"To PKIX"}
                testID={'pkix'}
                onPress={async () => {
                    const output = await RSA.convertPublicKeyToPKIX(
                        publicKey
                    );
                    setPKIX(output);
                }}
            />
            {!!jwt && <SectionResult testID={'result_pkix'}>{pkix}</SectionResult>}
        </SectionContainer>
    </Container>;
}