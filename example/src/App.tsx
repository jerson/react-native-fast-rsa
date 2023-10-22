import React, { useEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Generate from './modules/Generate';
import EncryptDecryptPKCS from './modules/EncryptDecryptPKCS';
import EncryptDecryptOAEP from './modules/EncryptDecryptOAEP';
import SignVerifyPKCS from './modules/SignVerifyPKCS';
import SignVerifyPSS from './modules/SignVerifyPSS';
import Base64 from './modules/Base64';
import HashExample from './modules/HashExample';
import ConvertPublic from './modules/ConvertPublic';
import ConvertPrivate from './modules/ConvertPrivate';
import ConvertJWT from './modules/ConvertJWT';
import ConvertKeyPair from './modules/ConvertKeyPair';
import RSA from 'react-native-fast-rsa';

const passphrase = 'test';
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEApkv2Jk5Ohi6XSmfBmbx70TX7kTh7JVu8W5R9wtoMuyDjbNco
HKoPAQ8W0LsVFGl+F9ylwm7/nlZTXwiTczjpzQQsGmW+u+sD6lK3zITE0zFNF4qV
hIcj0YIt314kjGXx8PtJqmePRf9b4dpegDpJVAc10vd2w4rlunJSfvNSJ96vB2PZ
2NNTXGAzuE1/pKZnhxXd64P4DVHgq9lLvljVlVNQBXmDJ6qT/m4RPYqu7NB3JVuS
nGxVny+D3ww8aqxtdqDdCXo4iFqfC//rr0zRjKUAUDR67HUCGHuA/Bdmj4VR1SPA
TCT+QIihOzUzOFbPeXXhwgmqsQ7wNn9yeTcNGwIDAQABAoIBAB3/aeGzEnsmAGiN
muDOnU85+61QkPZGPA4RFTaG+vDul9fUYAn7q0U3oZf5h23tMa/AP655M2cuj09/
TonkZFh1PjdszyE63bPxQ/KCqLaoGA39E8eaUR3D6951LwachS5BRiKVF8U6sSpm
p9FdskiUHGN3/FZ9wb8GTFdWMSW7vTDtsx3S0PkNSEjdxDZUq70E04NX3q19shX8
4AyNdFGCQXTN+Lk/dqWFtOtxhpFhceBWtmqb+P7LLXrWUcciMu8R5FHuUEfF3uM9
yQz7HmNqZX5qHG8iEiAcjthiNiTFo9pnvBIBwX0W5iDT+89Y62TmAiQY3HVkFTUU
p4cRAOECgYEA2U+WCSwuYVpPwvM1eq1N/w5S8HELYLrwepVVA8X3XH2A2pGtS0bj
sDnd2QXewjTreMc5pWK/0Pmh28r1AhouKCbjW2tX+ZWT/qyKh+HZ+ljw2Ois7fXQ
ibmvyQDt1dzfqd0yD1A+tMIdWc/Zlap9MptIEON5FA/orqPW5Jwo1YMCgYEAw+dL
dC0v6C4EdVBrBQHkxXaKWr5ZibyQ9hj262NHQI3Im1MnsoDBseXRLHSvN0bmnLXd
LcVAKtmxmOBtZkj1PUWWipYms8BGM2IV+T7fFWzw+8ZMXz7T6OIjLqvBAXQR9Wd5
Uzm0lEUzCZR0rXaIsgG0kj3/Ds6GkAYUgrIf7okCgYAEltGsT+qK08VrcIdol9BV
2o+V1E1RNaFudUjeU4ftxBi8hOcL9+tHBXHR63XQ1B1E57An9fXnC96HLboO2U6w
OmICxDmPY8FEV5B1XiekScyMSB2eyNomjm1P6V0cbxWqGKm9+QvZ9V95ThJiPr92
GiFjeepMqilXxs369fFG0QKBgEXmSW3ykZ1ujfit8QGgY1hxq3wlXx1eQvsMfU4P
5mSKMoH5cbinaHVpYvFR0RMQIUjZO0oRj4u6kTvTGDXe4mIyajyYxsZsXKAI534/
iKnEbVfosWdqq4H07kjAz+UM3TuK6Cdh96TP7B4G8nrSSIP7R8rGhDNsTWcmRDs+
A1bBAoGBANaiaRq8IzUVpZaG4cBgk+xynCfOQjkmzYsBJEbTqvmIjurEJ9OMOsXq
Toxj7FEKVXSxxN3bgC2E0zm7q/N9YIgTaNzt6XExImQRN63vQ6aFKsNMJ3dpqIQ9
+S5azYIPgyjJWz8G9MUOh8qeW8xNaz2MOikNSe7oMEbUHzeMBOgE
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBCgKCAQEApkv2Jk5Ohi6XSmfBmbx70TX7kTh7JVu8W5R9wtoMuyDjbNcoHKoP
AQ8W0LsVFGl+F9ylwm7/nlZTXwiTczjpzQQsGmW+u+sD6lK3zITE0zFNF4qVhIcj
0YIt314kjGXx8PtJqmePRf9b4dpegDpJVAc10vd2w4rlunJSfvNSJ96vB2PZ2NNT
XGAzuE1/pKZnhxXd64P4DVHgq9lLvljVlVNQBXmDJ6qT/m4RPYqu7NB3JVuSnGxV
ny+D3ww8aqxtdqDdCXo4iFqfC//rr0zRjKUAUDR67HUCGHuA/Bdmj4VR1SPATCT+
QIihOzUzOFbPeXXhwgmqsQ7wNn9yeTcNGwIDAQAB
-----END PUBLIC KEY-----
`;

const App = () => {

  useEffect(()=>{
    RSA.useJSI=true
  },[])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            testID={'list'}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            keyboardShouldPersistTaps={'handled'}
          >
            <View style={styles.body}>
              <EncryptDecryptOAEP
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <EncryptDecryptPKCS
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <SignVerifyPSS
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <SignVerifyPKCS
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <Base64
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <HashExample
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <Generate
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <ConvertPrivate
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <ConvertPublic
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <ConvertJWT
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
              <ConvertKeyPair
                publicKey={publicKey}
                privateKey={privateKey}
                passphrase={passphrase}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
    minHeight: Dimensions.get("screen").height
  },
});

export default App;
