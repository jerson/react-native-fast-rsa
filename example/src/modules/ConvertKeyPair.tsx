import { Button } from 'react-native';
import React, { useState } from 'react';
import RSA from 'react-native-fast-rsa';
import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';
import SectionResult from '../components/SectionResult';
import Container from '../components/Container';

interface Props {
  publicKey: string;
  privateKey: string;
  passphrase: string;
}

export default function ({ passphrase, privateKey }: Props) {
  const [privateResult, setPrivate] = useState('');

  return (
    <Container testID={'convert-keypair'}>
      <SectionContainer testID={'container'}>
        <SectionTitle>Convert KeyPair</SectionTitle>
        <Button
          title={'To PKCS12'}
          testID={'button'}
          onPress={async () => {
            const output = await RSA.convertKeyPairToPKCS12(
              privateKey,
              '',
              passphrase
            );
            setPrivate(output);
          }}
        />
        {!!privateResult && (
          <SectionResult testID={'result'}>{privateResult}</SectionResult>
        )}
      </SectionContainer>
    </Container>
  );
}
