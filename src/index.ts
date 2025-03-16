import { NativeModules } from 'react-native';
import * as flatbuffers from 'flatbuffers';
import { BoolResponse } from './model/bool-response';
import { GenerateRequest } from './model/generate-request';
import { KeyPairResponse } from './model/key-pair-response';
import { StringResponse } from './model/string-response';
import { ConvertPrivateKeyRequest } from './model/convert-private-key-request';
import { ConvertJWTRequest } from './model/convert-jwtrequest';
import { ConvertKeyPairRequest } from './model/convert-key-pair-request';
import { ConvertPKCS12Request } from './model/convert-pkcs12-request';
import { ConvertPublicKeyRequest } from './model/convert-public-key-request';
import { DecryptPrivateKeyRequest } from './model/decrypt-private-key-request';
import { EncryptPrivateKeyRequest } from './model/encrypt-private-key-request';
import { DecryptOAEPRequest } from './model/decrypt-oaeprequest';
import { DecryptPKCS1v15Request } from './model/decrypt-pkcs1v15-request';
import { EncryptOAEPRequest } from './model/encrypt-oaeprequest';
import { EncryptPKCS1v15Request } from './model/encrypt-pkcs1v15-request';
import { SignPSSRequest } from './model/sign-pssrequest';
import { SignPKCS1v15Request } from './model/sign-pkcs1v15-request';
import { VerifyPSSRequest } from './model/verify-pssrequest';
import { VerifyPKCS1v15Request } from './model/verify-pkcs1v15-request';
import { HashRequest } from './model/hash-request';
import { Base64Request } from './model/base64-request';
import { PKCS12KeyPairResponse } from './model/pkcs12-key-pair-response';
import { BytesResponse } from './model/bytes-response';
import './shim';
import { DecryptOAEPBytesRequest } from './model/decrypt-oaepbytes-request';
import { DecryptPKCS1v15BytesRequest } from './model/decrypt-pkcs1v15-bytes-request';
import { EncryptOAEPBytesRequest } from './model/encrypt-oaepbytes-request';
import { EncryptPKCS1v15BytesRequest } from './model/encrypt-pkcs1v15-bytes-request';
import { SignPSSBytesRequest } from './model/sign-pssbytes-request';
import { SignPKCS1v15BytesRequest } from './model/sign-pkcs1v15-bytes-request';
import { VerifyPSSBytesRequest } from './model/verify-pssbytes-request';
import { VerifyPKCS1v15BytesRequest } from './model/verify-pkcs1v15-bytes-request';

const FastRSANativeModules = (NativeModules as NativeModulesDef).FastRsa;
const isDebuggingEnabled =
  typeof atob !== 'undefined' && typeof HermesInternal === 'undefined';

typeof global.FastRSACallPromise === 'undefined' &&
  !isDebuggingEnabled &&
  FastRSANativeModules.install();

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

class RSAError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RSAError';
  }
}

export default class RSA {
  static useJSI = true;

  static async convertJWKToPrivateKey(
    data: any,
    keyId: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const dataOffset = builder.createString(JSON.stringify(data));
    const keyIdOffset = builder.createString(keyId);

    ConvertJWTRequest.startConvertJWTRequest(builder);
    ConvertJWTRequest.addData(builder, dataOffset);
    ConvertJWTRequest.addKeyId(builder, keyIdOffset);
    const offset = ConvertJWTRequest.endConvertJWTRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertJWKToPrivateKey',
      builder.asUint8Array()
    );
    return this._stringResponse(result);
  }
  static async convertJWKToPublicKey(
    data: any,
    keyId: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const dataOffset = builder.createString(JSON.stringify(data));
    const keyIdOffset = builder.createString(keyId);

    ConvertJWTRequest.startConvertJWTRequest(builder);
    ConvertJWTRequest.addData(builder, dataOffset);
    ConvertJWTRequest.addKeyId(builder, keyIdOffset);
    const offset = ConvertJWTRequest.endConvertJWTRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertJWKToPublicKey',
      builder.asUint8Array()
    );
    return this._stringResponse(result);
  }
  static async convertKeyPairToPKCS12(
    privateKey: string,
    certificate: string,
    password: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const privateKeyOffset = builder.createString(privateKey);
    const passwordOffset = builder.createString(password);
    const certificateOffset = builder.createString(certificate);

    ConvertKeyPairRequest.startConvertKeyPairRequest(builder);
    ConvertKeyPairRequest.addPrivateKey(builder, privateKeyOffset);
    ConvertKeyPairRequest.addCertificate(builder, certificateOffset);
    ConvertKeyPairRequest.addPassword(builder, passwordOffset);

    const offset = ConvertKeyPairRequest.endConvertKeyPairRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertKeyPairToPKCS12',
      builder.asUint8Array()
    );
    return this._stringResponse(result);
  }
  static async convertPKCS12ToKeyPair(
    pkcs12: string,
    password: string
  ): Promise<PCKS12KeyPair> {
    const builder = new flatbuffers.Builder(0);

    const pkcs12Offset = builder.createString(pkcs12);
    const passwordOffset = builder.createString(password);

    ConvertPKCS12Request.startConvertPKCS12Request(builder);
    ConvertPKCS12Request.addPkcs12(builder, pkcs12Offset);
    ConvertPKCS12Request.addPassword(builder, passwordOffset);

    const offset = ConvertPKCS12Request.endConvertPKCS12Request(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertPKCS12ToKeyPair',
      builder.asUint8Array()
    );
    return this._pkcs12KeyPairResponse(result);
  }
  static async convertPrivateKeyToPKCS8(privateKey: string): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const privateKeyOffset = builder.createString(privateKey);

    ConvertPrivateKeyRequest.startConvertPrivateKeyRequest(builder);
    ConvertPrivateKeyRequest.addPrivateKey(builder, privateKeyOffset);
    const offset =
      ConvertPrivateKeyRequest.endConvertPrivateKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertPrivateKeyToPKCS8',
      builder.asUint8Array()
    );
    return this._stringResponse(result);
  }
  static async convertPrivateKeyToPKCS1(privateKey: string): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const privateKeyOffset = builder.createString(privateKey);

    ConvertPrivateKeyRequest.startConvertPrivateKeyRequest(builder);
    ConvertPrivateKeyRequest.addPrivateKey(builder, privateKeyOffset);
    const offset =
      ConvertPrivateKeyRequest.endConvertPrivateKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertPrivateKeyToPKCS1',
      builder.asUint8Array()
    );
    return this._stringResponse(result);
  }
  static async convertPrivateKeyToJWK(privateKey: string): Promise<any> {
    const builder = new flatbuffers.Builder(0);

    const privateKeyOffset = builder.createString(privateKey);

    ConvertPrivateKeyRequest.startConvertPrivateKeyRequest(builder);
    ConvertPrivateKeyRequest.addPrivateKey(builder, privateKeyOffset);
    const offset =
      ConvertPrivateKeyRequest.endConvertPrivateKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertPrivateKeyToJWK',
      builder.asUint8Array()
    );
    return JSON.parse(this._stringResponse(result));
  }
  static async convertPrivateKeyToPublicKey(
    privateKey: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const privateKeyOffset = builder.createString(privateKey);

    ConvertPrivateKeyRequest.startConvertPrivateKeyRequest(builder);
    ConvertPrivateKeyRequest.addPrivateKey(builder, privateKeyOffset);
    const offset =
      ConvertPrivateKeyRequest.endConvertPrivateKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertPrivateKeyToPublicKey',
      builder.asUint8Array()
    );
    return this._stringResponse(result);
  }
  static async convertPublicKeyToPKIX(publicKey: string): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const publicKeyOffset = builder.createString(publicKey);

    ConvertPublicKeyRequest.startConvertPublicKeyRequest(builder);
    ConvertPublicKeyRequest.addPublicKey(builder, publicKeyOffset);
    const offset = ConvertPublicKeyRequest.endConvertPublicKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertPublicKeyToPKIX',
      builder.asUint8Array()
    );
    return this._stringResponse(result);
  }
  static async convertPublicKeyToPKCS1(publicKey: string): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const publicKeyOffset = builder.createString(publicKey);

    ConvertPublicKeyRequest.startConvertPublicKeyRequest(builder);
    ConvertPublicKeyRequest.addPublicKey(builder, publicKeyOffset);
    const offset = ConvertPublicKeyRequest.endConvertPublicKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertPublicKeyToPKCS1',
      builder.asUint8Array()
    );
    return this._stringResponse(result);
  }
  static async convertPublicKeyToJWK(publicKey: string): Promise<any> {
    const builder = new flatbuffers.Builder(0);

    const publicKeyOffset = builder.createString(publicKey);

    ConvertPublicKeyRequest.startConvertPublicKeyRequest(builder);
    ConvertPublicKeyRequest.addPublicKey(builder, publicKeyOffset);
    const offset = ConvertPublicKeyRequest.endConvertPublicKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'convertPublicKeyToJWK',
      builder.asUint8Array()
    );
    return JSON.parse(this._stringResponse(result));
  }
  static async decryptPrivateKey(
    privateKeyEncrypted: string,
    password: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const privateKeyEncryptedOffset = builder.createString(privateKeyEncrypted);
    const passwordOffset = builder.createString(password);

    DecryptPrivateKeyRequest.startDecryptPrivateKeyRequest(builder);
    DecryptPrivateKeyRequest.addPrivateKeyEncrypted(
      builder,
      privateKeyEncryptedOffset
    );
    DecryptPrivateKeyRequest.addPassword(builder, passwordOffset);
    const offset =
      DecryptPrivateKeyRequest.endDecryptPrivateKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call('decryptPrivateKey', builder.asUint8Array());
    return this._stringResponse(result);
  }
  static async encryptPrivateKey(
    privateKey: string,
    password: string,
    cipherName: PEMCipher
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const privateKeyOffset = builder.createString(privateKey);
    const passwordOffset = builder.createString(password);

    EncryptPrivateKeyRequest.startEncryptPrivateKeyRequest(builder);
    EncryptPrivateKeyRequest.addPrivateKey(builder, privateKeyOffset);
    EncryptPrivateKeyRequest.addPassword(builder, passwordOffset);
    EncryptPrivateKeyRequest.addCipher(builder, cipherName);
    const offset =
      EncryptPrivateKeyRequest.endEncryptPrivateKeyRequest(builder);
    builder.finish(offset);

    const result = await this.call('decryptPrivateKey', builder.asUint8Array());
    return this._stringResponse(result);
  }

  static async decryptOAEP(
    message: string,
    label: string,
    hashName: Hash,
    privateKey: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createString(message);
    const labelOffset = builder.createString(label);
    const privateKeyOffset = builder.createString(privateKey);

    DecryptOAEPRequest.startDecryptOAEPRequest(builder);
    DecryptOAEPRequest.addCiphertext(builder, messageOffset);
    DecryptOAEPRequest.addLabel(builder, labelOffset);
    DecryptOAEPRequest.addPrivateKey(builder, privateKeyOffset);
    DecryptOAEPRequest.addHash(builder, hashName);
    const offset = DecryptOAEPRequest.endDecryptOAEPRequest(builder);
    builder.finish(offset);

    const result = await this.call('decryptOAEP', builder.asUint8Array());
    return this._stringResponse(result);
  }

  static async decryptOAEPBytes(
    message: Uint8Array,
    label: string,
    hashName: Hash,
    privateKey: string
  ): Promise<Uint8Array> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createByteVector(message);
    const labelOffset = builder.createString(label);
    const privateKeyOffset = builder.createString(privateKey);

    DecryptOAEPBytesRequest.startDecryptOAEPBytesRequest(builder);
    DecryptOAEPBytesRequest.addCiphertext(builder, messageOffset);
    DecryptOAEPBytesRequest.addLabel(builder, labelOffset);
    DecryptOAEPBytesRequest.addPrivateKey(builder, privateKeyOffset);
    DecryptOAEPBytesRequest.addHash(builder, hashName);
    const offset = DecryptOAEPBytesRequest.endDecryptOAEPBytesRequest(builder);
    builder.finish(offset);

    const result = await this.call('decryptOAEPBytes', builder.asUint8Array());
    return this._bytesResponse(result);
  }

  static async decryptPKCS1v15(
    message: string,
    privateKey: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createString(message);
    const privateKeyOffset = builder.createString(privateKey);

    DecryptPKCS1v15Request.startDecryptPKCS1v15Request(builder);
    DecryptPKCS1v15Request.addPrivateKey(builder, privateKeyOffset);
    DecryptPKCS1v15Request.addCiphertext(builder, messageOffset);
    const offset = DecryptPKCS1v15Request.endDecryptPKCS1v15Request(builder);
    builder.finish(offset);

    const result = await this.call('decryptPKCS1v15', builder.asUint8Array());
    return this._stringResponse(result);
  }

  static async decryptPKCS1v15Bytes(
    message: Uint8Array,
    privateKey: string
  ): Promise<Uint8Array> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createByteVector(message);
    const privateKeyOffset = builder.createString(privateKey);

    DecryptPKCS1v15BytesRequest.startDecryptPKCS1v15BytesRequest(builder);
    DecryptPKCS1v15BytesRequest.addPrivateKey(builder, privateKeyOffset);
    DecryptPKCS1v15BytesRequest.addCiphertext(builder, messageOffset);
    const offset =
      DecryptPKCS1v15BytesRequest.endDecryptPKCS1v15BytesRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'decryptPKCS1v15Bytes',
      builder.asUint8Array()
    );
    return this._bytesResponse(result);
  }
  static async encryptOAEP(
    message: string,
    label: string,
    hashName: Hash,
    publicKey: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createString(message);
    const labelOffset = builder.createString(label);
    const publicKeyOffset = builder.createString(publicKey);

    EncryptOAEPRequest.startEncryptOAEPRequest(builder);
    EncryptOAEPRequest.addMessage(builder, messageOffset);
    EncryptOAEPRequest.addLabel(builder, labelOffset);
    EncryptOAEPRequest.addHash(builder, hashName);
    EncryptOAEPRequest.addPublicKey(builder, publicKeyOffset);
    const offset = EncryptOAEPRequest.endEncryptOAEPRequest(builder);
    builder.finish(offset);

    const result = await this.call('encryptOAEP', builder.asUint8Array());
    return this._stringResponse(result);
  }
  static async encryptOAEPBytes(
    message: Uint8Array,
    label: string,
    hashName: Hash,
    publicKey: string
  ): Promise<Uint8Array> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createByteVector(message);
    const labelOffset = builder.createString(label);
    const publicKeyOffset = builder.createString(publicKey);

    EncryptOAEPBytesRequest.startEncryptOAEPBytesRequest(builder);
    EncryptOAEPBytesRequest.addMessage(builder, messageOffset);
    EncryptOAEPBytesRequest.addLabel(builder, labelOffset);
    EncryptOAEPBytesRequest.addHash(builder, hashName);
    EncryptOAEPBytesRequest.addPublicKey(builder, publicKeyOffset);
    const offset = EncryptOAEPBytesRequest.endEncryptOAEPBytesRequest(builder);
    builder.finish(offset);

    const result = await this.call('encryptOAEPBytes', builder.asUint8Array());
    return this._bytesResponse(result);
  }
  static async encryptPKCS1v15(
    message: string,
    publicKey: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createString(message);
    const publicKeyOffset = builder.createString(publicKey);

    EncryptPKCS1v15Request.startEncryptPKCS1v15Request(builder);
    EncryptPKCS1v15Request.addMessage(builder, messageOffset);
    EncryptPKCS1v15Request.addPublicKey(builder, publicKeyOffset);
    const offset = EncryptPKCS1v15Request.endEncryptPKCS1v15Request(builder);
    builder.finish(offset);

    const result = await this.call('encryptPKCS1v15', builder.asUint8Array());
    return this._stringResponse(result);
  }
  static async encryptPKCS1v15Bytes(
    message: Uint8Array,
    publicKey: string
  ): Promise<Uint8Array> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createByteVector(message);
    const publicKeyOffset = builder.createString(publicKey);

    EncryptPKCS1v15BytesRequest.startEncryptPKCS1v15BytesRequest(builder);
    EncryptPKCS1v15BytesRequest.addMessage(builder, messageOffset);
    EncryptPKCS1v15BytesRequest.addPublicKey(builder, publicKeyOffset);
    const offset =
      EncryptPKCS1v15BytesRequest.endEncryptPKCS1v15BytesRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'encryptPKCS1v15Bytes',
      builder.asUint8Array()
    );
    return this._bytesResponse(result);
  }
  static async signPSS(
    message: string,
    hashName: Hash,
    saltLengthName: SaltLength,
    privateKey: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createString(message);
    const privateKeyOffset = builder.createString(privateKey);

    SignPSSRequest.startSignPSSRequest(builder);
    SignPSSRequest.addMessage(builder, messageOffset);
    SignPSSRequest.addHash(builder, hashName);
    SignPSSRequest.addSaltLength(builder, saltLengthName);
    SignPSSRequest.addPrivateKey(builder, privateKeyOffset);
    const offset = SignPSSRequest.endSignPSSRequest(builder);
    builder.finish(offset);

    const result = await this.call('signPSS', builder.asUint8Array());
    return this._stringResponse(result);
  }
  static async signPSSBytes(
    message: Uint8Array,
    hashName: Hash,
    saltLengthName: SaltLength,
    privateKey: string
  ): Promise<Uint8Array> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createByteVector(message);
    const privateKeyOffset = builder.createString(privateKey);

    SignPSSBytesRequest.startSignPSSBytesRequest(builder);
    SignPSSBytesRequest.addMessage(builder, messageOffset);
    SignPSSBytesRequest.addHash(builder, hashName);
    SignPSSBytesRequest.addSaltLength(builder, saltLengthName);
    SignPSSBytesRequest.addPrivateKey(builder, privateKeyOffset);
    const offset = SignPSSBytesRequest.endSignPSSBytesRequest(builder);
    builder.finish(offset);

    const result = await this.call('signPSSBytes', builder.asUint8Array());
    return this._bytesResponse(result);
  }
  static async signPKCS1v15(
    message: string,
    hashName: Hash,
    privateKey: string
  ): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createString(message);
    const privateKeyOffset = builder.createString(privateKey);

    SignPKCS1v15Request.startSignPKCS1v15Request(builder);
    SignPKCS1v15Request.addMessage(builder, messageOffset);
    SignPKCS1v15Request.addHash(builder, hashName);
    SignPKCS1v15Request.addPrivateKey(builder, privateKeyOffset);
    const offset = SignPKCS1v15Request.endSignPKCS1v15Request(builder);
    builder.finish(offset);

    const result = await this.call('signPKCS1v15', builder.asUint8Array());
    return this._stringResponse(result);
  }
  static async signPKCS1v15Bytes(
    message: Uint8Array,
    hashName: Hash,
    privateKey: string
  ): Promise<Uint8Array> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createByteVector(message);
    const privateKeyOffset = builder.createString(privateKey);

    SignPKCS1v15BytesRequest.startSignPKCS1v15BytesRequest(builder);
    SignPKCS1v15BytesRequest.addMessage(builder, messageOffset);
    SignPKCS1v15BytesRequest.addHash(builder, hashName);
    SignPKCS1v15BytesRequest.addPrivateKey(builder, privateKeyOffset);
    const offset =
      SignPKCS1v15BytesRequest.endSignPKCS1v15BytesRequest(builder);
    builder.finish(offset);

    const result = await this.call('signPKCS1v15Bytes', builder.asUint8Array());
    return this._bytesResponse(result);
  }
  static async verifyPSS(
    signature: string,
    message: string,
    hashName: Hash,
    saltLengthName: SaltLength,
    publicKey: string
  ): Promise<boolean> {
    const builder = new flatbuffers.Builder(0);

    const signatureOffset = builder.createString(signature);
    const messageOffset = builder.createString(message);
    const publicKeyOffset = builder.createString(publicKey);

    VerifyPSSRequest.startVerifyPSSRequest(builder);
    VerifyPSSRequest.addSignature(builder, signatureOffset);
    VerifyPSSRequest.addMessage(builder, messageOffset);
    VerifyPSSRequest.addHash(builder, hashName);
    VerifyPSSRequest.addSaltLength(builder, saltLengthName);
    VerifyPSSRequest.addPublicKey(builder, publicKeyOffset);
    const offset = VerifyPSSRequest.endVerifyPSSRequest(builder);
    builder.finish(offset);

    const result = await this.call('verifyPSS', builder.asUint8Array());
    return this._boolResponse(result);
  }
  static async verifyPSSBytes(
    signature: Uint8Array,
    message: Uint8Array,
    hashName: Hash,
    saltLengthName: SaltLength,
    publicKey: string
  ): Promise<boolean> {
    const builder = new flatbuffers.Builder(0);

    const signatureOffset = builder.createByteVector(signature);
    const messageOffset = builder.createByteVector(message);
    const publicKeyOffset = builder.createString(publicKey);

    VerifyPSSBytesRequest.startVerifyPSSBytesRequest(builder);
    VerifyPSSBytesRequest.addSignature(builder, signatureOffset);
    VerifyPSSBytesRequest.addMessage(builder, messageOffset);
    VerifyPSSBytesRequest.addHash(builder, hashName);
    VerifyPSSBytesRequest.addSaltLength(builder, saltLengthName);
    VerifyPSSBytesRequest.addPublicKey(builder, publicKeyOffset);
    const offset = VerifyPSSBytesRequest.endVerifyPSSBytesRequest(builder);
    builder.finish(offset);

    const result = await this.call('verifyPSSBytes', builder.asUint8Array());
    return this._boolResponse(result);
  }
  static async verifyPKCS1v15(
    signature: string,
    message: string,
    hashName: Hash,
    publicKey: string
  ): Promise<boolean> {
    const builder = new flatbuffers.Builder(0);

    const signatureOffset = builder.createString(signature);
    const messageOffset = builder.createString(message);
    const publicKeyOffset = builder.createString(publicKey);

    VerifyPKCS1v15Request.startVerifyPKCS1v15Request(builder);
    VerifyPKCS1v15Request.addSignature(builder, signatureOffset);
    VerifyPKCS1v15Request.addMessage(builder, messageOffset);
    VerifyPKCS1v15Request.addHash(builder, hashName);
    VerifyPKCS1v15Request.addPublicKey(builder, publicKeyOffset);
    const offset = VerifyPKCS1v15Request.endVerifyPKCS1v15Request(builder);
    builder.finish(offset);

    const result = await this.call('verifyPKCS1v15', builder.asUint8Array());
    return this._boolResponse(result);
  }
  static async verifyPKCS1v15Bytes(
    signature: Uint8Array,
    message: Uint8Array,
    hashName: Hash,
    publicKey: string
  ): Promise<boolean> {
    const builder = new flatbuffers.Builder(0);

    const signatureOffset = builder.createByteVector(signature);
    const messageOffset = builder.createByteVector(message);
    const publicKeyOffset = builder.createString(publicKey);

    VerifyPKCS1v15BytesRequest.startVerifyPKCS1v15BytesRequest(builder);
    VerifyPKCS1v15BytesRequest.addSignature(builder, signatureOffset);
    VerifyPKCS1v15BytesRequest.addMessage(builder, messageOffset);
    VerifyPKCS1v15BytesRequest.addHash(builder, hashName);
    VerifyPKCS1v15BytesRequest.addPublicKey(builder, publicKeyOffset);
    const offset =
      VerifyPKCS1v15BytesRequest.endVerifyPKCS1v15BytesRequest(builder);
    builder.finish(offset);

    const result = await this.call(
      'verifyPKCS1v15Bytes',
      builder.asUint8Array()
    );
    return this._boolResponse(result);
  }

  static async hash(message: string, name: Hash): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createString(message);

    HashRequest.startHashRequest(builder);
    HashRequest.addMessage(builder, messageOffset);
    HashRequest.addHash(builder, name);
    const offset = HashRequest.endHashRequest(builder);
    builder.finish(offset);

    const result = await this.call('hash', builder.asUint8Array());
    return this._stringResponse(result);
  }

  static async base64(message: string): Promise<string> {
    const builder = new flatbuffers.Builder(0);

    const messageOffset = builder.createString(message);

    Base64Request.startBase64Request(builder);
    Base64Request.addMessage(builder, messageOffset);
    const offset = Base64Request.endBase64Request(builder);
    builder.finish(offset);

    const result = await this.call('base64', builder.asUint8Array());
    return this._stringResponse(result);
  }

  static async generate(bits: number): Promise<KeyPair> {
    const builder = new flatbuffers.Builder(0);

    GenerateRequest.startGenerateRequest(builder);
    GenerateRequest.addNBits(builder, bits);
    const offset = GenerateRequest.endGenerateRequest(builder);
    builder.finish(offset);

    const result = await this.call('generate', builder.asUint8Array());
    return this._keyPairResponse(result);
  }

  private static async call(
    name: string,
    bytes: Uint8Array
  ): Promise<flatbuffers.ByteBuffer> {
    try {
      if (this.useJSI && typeof global.FastRSACallPromise === 'function') {
        const buff = bytes.buffer.slice(
          bytes.byteOffset,
          bytes.byteLength + bytes.byteOffset
        );

        const result = global.FastRSACallSync(name, buff);
        const rawResponse = new Uint8Array(result, 0, result.byteLength);
        return new flatbuffers.ByteBuffer(rawResponse);
      } else {
        const result = await FastRSANativeModules.call(name, Array.from(bytes));
        const rawResponse = new Uint8Array(result);
        return new flatbuffers.ByteBuffer(rawResponse);
      }
    } catch (e) {
      throw new RSAError(`BridgeCall failed: ${e}`);
    }
  }

  private static _bytesResponse(result: flatbuffers.ByteBuffer): Uint8Array {
    const response = BytesResponse.getRootAsBytesResponse(result);
    const error = response.error();
    if (error) {
      throw new RSAError('stringResponse: ' + error);
    }
    return response.outputArray() || Uint8Array.from([]);
  }

  private static _stringResponse(result: flatbuffers.ByteBuffer): string {
    const response = StringResponse.getRootAsStringResponse(result);
    const error = response.error();
    if (error) {
      throw new RSAError('stringResponse: ' + error);
    }
    return response.output() || '';
  }

  private static _boolResponse(result: flatbuffers.ByteBuffer): boolean {
    const response = BoolResponse.getRootAsBoolResponse(result);
    const error = response.error();
    if (error) {
      throw new RSAError('boolResponse: ' + error);
    }
    return response.output();
  }

  private static _keyPairResponse(result: flatbuffers.ByteBuffer): KeyPair {
    const response = KeyPairResponse.getRootAsKeyPairResponse(result);
    const error = response.error();
    if (error) {
      throw new RSAError('keyPairResponse: ' + error);
    }
    const output = response.output();
    if (!output) {
      throw new RSAError('empty output');
    }

    return {
      privateKey: output.privateKey() || '',
      publicKey: output.publicKey() || '',
    } as KeyPair;
  }

  private static _pkcs12KeyPairResponse(
    result: flatbuffers.ByteBuffer
  ): PCKS12KeyPair {
    const response =
      PKCS12KeyPairResponse.getRootAsPKCS12KeyPairResponse(result);
    const error = response.error();
    if (error) {
      throw new RSAError('pkcs12KeyPairResponse: ' + error);
    }
    const output = response.output();
    if (!output) {
      throw new RSAError('empty output');
    }

    return {
      privateKey: output.privateKey() || '',
      publicKey: output.publicKey() || '',
      certificate: output.certificate() || '',
    } as PCKS12KeyPair;
  }
}
