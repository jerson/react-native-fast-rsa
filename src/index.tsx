import { NativeModules } from "react-native";

const { RNFastRsa } = NativeModules;

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export type RSAHash  = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' 
export type RSABits  = 512 | 1024 | 2048 | 4096

export default class RSA {
  static decrypt(
    message: string,
    pkcs12: string,
    passphrase: string
  ): Promise<string> {
    return RNFastRsa.decrypt(message, pkcs12, passphrase);
  }
  static encrypt(message: string, pkcs12: string, passphrase: string): Promise<string> {
    return RNFastRsa.encrypt(message, pkcs12, passphrase);
  }
  static sign(
    hash: string,
    hashName: RSAHash,
    pkcs12: string,
    passphrase: string
  ): Promise<string> {
    return RNFastRsa.sign(hash, hashName, pkcs12, passphrase);
  }
  static verify(
    signature: string,
    hash: string,
    hashName: RSAHash,
    pkcs12: string,
    passphrase: string
  ): Promise<boolean> {
    return RNFastRsa.verify(signature, hash, hashName, pkcs12, passphrase);
  }

  static hash(
    message: string,
    name: RSAHash
  ): Promise<boolean> {
    return RNFastRsa.hash(message, name);
  }

  static base64(
    message: string
  ): Promise<boolean> {
    return RNFastRsa.base64(message);
  }

  static generate(bits: RSABits): Promise<KeyPair> {
    return RNFastRsa.generate(bits);
  }
}
