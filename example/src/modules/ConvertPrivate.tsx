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

export default function ({privateKey}: Props) {

    const [jwt, setJWT] = useState('');
    const [pkcs1, setPKCS1] = useState('');
    const [pkcs8, setPKCS8] = useState('');
    const [publicKey, setPublicKey] = useState('');
    
    return <Container testID={'convert-private'}>
        <SectionContainer testID={'container'}>
            <SectionTitle>Convert PrivateKey</SectionTitle>
            <Button
                title={"To JWT"}
                testID={'jwt'}
                onPress={async () => {
                    const output = await RSA.convertPrivateKeyToJWK(
                        privateKey
                    );
                    setJWT(JSON.stringify(output));
                }}
            />
            {!!jwt && <SectionResult testID={'result_jwt'}>{jwt}</SectionResult>}
            <Button
                title={"To PKCS1"}
                testID={'pkcs1'}
                onPress={async () => {
                    const output = await RSA.convertPrivateKeyToPKCS1(
                        privateKey
                    );
                    setPKCS1(output);
                }}
            />
            {!!jwt && <SectionResult testID={'result_pkcs1'}>{pkcs1}</SectionResult>}
            <Button
                title={"To PKCS8"}
                testID={'pkcs8'}
                onPress={async () => {
                    const output = await RSA.convertPrivateKeyToPKCS8(
                        privateKey
                    );
                    setPKCS8(output);
                }}
            />
            {!!jwt && <SectionResult testID={'result_pkcs8'}>{pkcs8}</SectionResult>}
            <Button
                title={"To PublicKey"}
                testID={'publickey'}
                onPress={async () => {
                    const output = await RSA.convertPrivateKeyToPublicKey(
                        privateKey
                    );
                    setPublicKey(output);
                }}
            />
            {!!jwt && <SectionResult testID={'result_publickey'}>{publicKey}</SectionResult>}
        </SectionContainer>
    </Container>;
}