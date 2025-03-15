# react-native-fast-rsa

[![Android](https://github.com/jerson/react-native-fast-rsa/actions/workflows/android.yml/badge.svg)](https://github.com/jerson/react-native-fast-rsa/actions/workflows/android.yml)
[![iOS](https://github.com/jerson/react-native-fast-rsa/actions/workflows/ios.yml/badge.svg)](https://github.com/jerson/react-native-fast-rsa/actions/workflows/ios.yml)

## Getting started

`$ npm install react-native-fast-rsa --save`

## JSI


If you want to use with `NativeModules` instead of `JSI` you need to set

```typescript
import RSA from "react-native-fast-rsa";

RSA.useJSI = false;
```
if you need to use generate methods it is a good idea to disable it, because for now JSI will block your UI but it is faster compared to NativeModules


## Usage

```typescript

export interface PCKS12KeyPair {
  publicKey: string;
  privateKey: string;
  certificate: string;
}
export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export enum Hash {
  MD5 = 0,
  SHA1 = 1,
  SHA224 = 2,
  SHA256 = 3,
  SHA384 = 4,
  SHA512 = 5,
}

export enum PEMCipher {
  DES = 0,
  D3DES = 1,
  AES128 = 2,
  AES192 = 3,
  AES256 = 4,
}

export enum SaltLength {
  AUTO = 0,
  EQUALS_HASH = 1,
}

class RSA {
  static convertJWKToPrivateKey(data: any, keyId: string): Promise<string>
  static convertJWKToPublicKey(data: any, keyId: string): Promise<string>

  static convertKeyPairToPKCS12(privateKey: string, certificate: string, password: string): Promise<string>
  static convertPKCS12ToKeyPair(pkcs12: string, password: string,): Promise<PCKS12KeyPair>

  static convertPrivateKeyToPKCS8(privateKey: string,): Promise<string>
  static convertPrivateKeyToPKCS1(privateKey: string): Promise<string>
  static convertPrivateKeyToJWK(privateKey: string): Promise<any>
  static convertPrivateKeyToPublicKey(privateKey: string): Promise<string>

  static convertPublicKeyToPKIX(publicKey: string): Promise<string>
  static convertPublicKeyToPKCS1(publicKey: string): Promise<string>
  static convertPublicKeyToJWK(publicKey: string): Promise<any>

  static decryptPrivateKey(privateKeyEncrypted: string, password: string,): Promise<string>
  static encryptPrivateKey(privateKey: string, password: string, cipherName: Cipher): Promise<string>

  static decryptOAEP(message: string, label: string, hashName: Hash, privateKey: string): Promise<string>
  static decryptPKCS1v15(message: string, privateKey: string,): Promise<string>

  static decryptOAEPBytes(message: Uint8Array, label: string, hashName: Hash, privateKey: string): Promise<Uint8Array>
  static decryptPKCS1v15Bytes(message: Uint8Array, privateKey: string,): Promise<Uint8Array>

  static encryptOAEP(message: string,label: string, hashName: Hash, publicKey: string): Promise<string>
  static encryptPKCS1v15(message: string, publicKey: string): Promise<string>

  static encryptOAEPBytes(message: Uint8Array,label: string, hashName: Hash, publicKey: string): Promise<Uint8Array>
  static encryptPKCS1v15Bytes(message: Uint8Array, publicKey: string): Promise<Uint8Array>

  static signPSS(message: string, hashName: Hash, saltLengthName: SaltLength, privateKey: string): Promise<string>
  static signPKCS1v15(message: string, hashName: Hash, privateKey: string): Promise<string>

  static signPSSBytes(message: Uint8Array, hashName: Hash, saltLengthName: SaltLength, privateKey: string): Promise<Uint8Array>
  static signPKCS1v15Bytes(message: Uint8Array, hashName: Hash, privateKey: string): Promise<Uint8Array>

  static verifyPSS(signature: string, message: string, hashName: Hash, saltLengthName: SaltLength, publicKey: string): Promise<boolean>
  static verifyPKCS1v15(signature: string, message: string, hashName: Hash, publicKey: string): Promise<boolean>

  static verifyPSSBytes(signature: Uint8Array, message: Uint8Array, hashName: Hash, saltLengthName: SaltLength, publicKey: string): Promise<boolean>
  static verifyPKCS1v15Bytes(signature: Uint8Array, message: Uint8Array, hashName: Hash, publicKey: string): Promise<boolean>

  static hash(message: string, name: Hash): Promise<string>
  static base64(message: string): Promise<string>

  static generate(bits: number): Promise<KeyPair>
}

```

## Native Code

the native library is made in Golang for faster performance

https://github.com/jerson/rsa-mobile

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
