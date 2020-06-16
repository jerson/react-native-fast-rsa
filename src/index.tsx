import { NativeModules } from "react-native";

const { RNFastRsa } = NativeModules;

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export type RSAHash  = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' 
export type RSABits  = 512 | 1024 | 2048 | 4096
export type RSASaltLength  = 'auto' | 'equalsHash' 

export default class RSA {
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
