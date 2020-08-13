import { NativeModules } from "react-native";

const { RNFastRsa } = NativeModules;

export interface PCKS12KeyPair {
  publicKey: string;
  privateKey: string;
  certificate: string;
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export type RSAHash  = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' 
export type RSABits  = 512 | 1024 | 2048 | 4096
export type RSASaltLength  = 'auto' | 'equalsHash' 
export type RSAPEMCipher  = 'des'  | '3des'| 'aes128'| 'aes192'| 'aes256'

export default class RSA {
  static convertJWKToPrivateKey(
    data: any,
    keyId: string,
  ): Promise<string> {
    return RNFastRsa.convertJWKToPrivateKey(JSON.stringify(data), keyId);
  }
  static convertJWKToPublicKey(
    data: any,
    keyId: string,
  ): Promise<string> {
    return RNFastRsa.convertJWKToPublicKey(JSON.stringify(data), keyId);
  }
  static convertKeyPairToPKCS12(
    privateKey: string,
    certificate: string,
    password: string,
  ): Promise<string> {
    return RNFastRsa.convertKeyPairToPKCS12(privateKey, certificate, password);
  }
  static convertPKCS12ToKeyPair(
    pkcs12: string,
    password: string,
  ): Promise<PCKS12KeyPair> {
    return RNFastRsa.convertPKCS12ToKeyPair(pkcs12, password);
  }
  static convertPrivateKeyToPKCS8(
    privateKey: string,
  ): Promise<string> {
    return RNFastRsa.convertPrivateKeyToPKCS8(privateKey);
  }
  static convertPrivateKeyToPKCS1(
    privateKey: string,
  ): Promise<string> {
    return RNFastRsa.convertPrivateKeyToPKCS1(privateKey);
  }
  static async convertPrivateKeyToJWK(
    privateKey: string,
  ): Promise<any> {
    return JSON.parse(await RNFastRsa.convertPrivateKeyToJWK(privateKey));
  }
  static convertPrivateKeyToPublicKey(
    privateKey: string,
  ): Promise<string> {
    return RNFastRsa.convertPrivateKeyToPublicKey(privateKey);
  }
  static convertPublicKeyToPKIX(
    publicKey: string,
  ): Promise<string> {
    return RNFastRsa.convertPublicKeyToPKIX(publicKey);
  }
  static convertPublicKeyToPKCS1(
    publicKey: string,
  ): Promise<string> {
    return RNFastRsa.convertPublicKeyToPKCS1(publicKey);
  }
  static async convertPublicKeyToJWK(
    publicKey: string,
  ): Promise<any> {
    return JSON.parse(await RNFastRsa.convertPublicKeyToJWK(publicKey));
  }
  static decryptPrivateKey(
    privateKeyEncrypted: string,
    password: string,
  ): Promise<string> {
    return RNFastRsa.decryptPrivateKey(privateKeyEncrypted,password);
  }
  static encryptPrivateKey(
    privateKey: string,
    password: string,
    cipherName: RSAPEMCipher,
  ): Promise<string> {
    return RNFastRsa.encryptPrivateKey(privateKey,password,cipherName);
  }

  static decryptOAEP(
    message: string,
    label: string,
    hashName: RSAHash,
    privateKey: string,
  ): Promise<string> {
    return RNFastRsa.decryptOAEP(message, label,hashName,privateKey);
  }
  static decryptPKCS1v15(
    message: string,
    privateKey: string,
  ): Promise<string> {
    return RNFastRsa.decryptPKCS1v15(message, privateKey);
  }
  static encryptOAEP(message: string,label: string, hashName: RSAHash, publicKey: string): Promise<string> {
    return RNFastRsa.encryptOAEP(message,label,hashName, publicKey);
  }
  static encryptPKCS1v15(message: string, publicKey: string): Promise<string> {
    return RNFastRsa.encryptPKCS1v15(message, publicKey);
  }
  static signPSS(
    message: string,
    hashName: RSAHash,
    saltLengthName: RSASaltLength,
    privateKey: string
  ): Promise<string> {
    return RNFastRsa.signPSS(message, hashName, saltLengthName, privateKey);
  }
  static signPKCS1v15(
    message: string,
    hashName: RSAHash,
    privateKey: string,
  ): Promise<string> {
    return RNFastRsa.signPKCS1v15(message, hashName, privateKey);
  }
  static verifyPSS(
    signature: string,
    message: string,
    hashName: RSAHash,
    saltLengthName: RSASaltLength,
    publicKey: string
  ): Promise<boolean> {
    return RNFastRsa.verifyPSS(signature, message, hashName, saltLengthName, publicKey);
  }
  static verifyPKCS1v15(
    signature: string,
    message: string,
    hashName: RSAHash,
    publicKey: string,
  ): Promise<boolean> {
    return RNFastRsa.verifyPKCS1v15(signature, message, hashName, publicKey);
  }

  static hash(
    message: string,
    name: RSAHash
  ): Promise<string> {
    return RNFastRsa.hash(message, name);
  }

  static base64(
    message: string
  ): Promise<string> {
    return RNFastRsa.base64(message);
  }

  static generate(bits: RSABits): Promise<KeyPair> {
    return RNFastRsa.generate(bits);
  }
}
