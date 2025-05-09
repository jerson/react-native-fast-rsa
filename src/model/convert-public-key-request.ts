// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class ConvertPublicKeyRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):ConvertPublicKeyRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsConvertPublicKeyRequest(bb:flatbuffers.ByteBuffer, obj?:ConvertPublicKeyRequest):ConvertPublicKeyRequest {
  return (obj || new ConvertPublicKeyRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsConvertPublicKeyRequest(bb:flatbuffers.ByteBuffer, obj?:ConvertPublicKeyRequest):ConvertPublicKeyRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new ConvertPublicKeyRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

publicKey():string|null
publicKey(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
publicKey(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startConvertPublicKeyRequest(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addPublicKey(builder:flatbuffers.Builder, publicKeyOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, publicKeyOffset, 0);
}

static endConvertPublicKeyRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createConvertPublicKeyRequest(builder:flatbuffers.Builder, publicKeyOffset:flatbuffers.Offset):flatbuffers.Offset {
  ConvertPublicKeyRequest.startConvertPublicKeyRequest(builder);
  ConvertPublicKeyRequest.addPublicKey(builder, publicKeyOffset);
  return ConvertPublicKeyRequest.endConvertPublicKeyRequest(builder);
}
}
