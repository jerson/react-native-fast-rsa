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

export default function ({ publicKey, privateKey }: Props) {
  const [privateResult, setPrivate] = useState('');
  const [publicResult, setPublic] = useState('');

  return (
    <Container testID={'convert-jwt'}>
      <SectionContainer testID={'container'}>
        <SectionTitle>Convert JWT</SectionTitle>
        <Button
          title={'To PrivateKey'}
          testID={'private'}
          onPress={async () => {
            var converted = await RSA.convertPrivateKeyToJWK(privateKey);
            const output = await RSA.convertJWKToPrivateKey(converted, '');
            setPrivate(output);
          }}
        />
        {!!privateResult && (
          <SectionResult testID={'result_private'}>
            {privateResult}
          </SectionResult>
        )}
        <Button
          title={'To PublicKey'}
          testID={'public'}
          onPress={async () => {
            var converted = await RSA.convertPublicKeyToJWK(
              publicKey,
            );
            const output = await RSA.convertJWKToPublicKey(converted,'');
            setPublic(output);
          }}
        />
        {!!publicResult && (
          <SectionResult testID={'result_public'}>
            {publicResult}
          </SectionResult>
        )}
      </SectionContainer>
    </Container>
  );
}
