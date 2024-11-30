// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

import { PublicKeyInfo } from '../model/public-key-info';


export class PublicKeyInfoResponse {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):PublicKeyInfoResponse {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsPublicKeyInfoResponse(bb:flatbuffers.ByteBuffer, obj?:PublicKeyInfoResponse):PublicKeyInfoResponse {
  return (obj || new PublicKeyInfoResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsPublicKeyInfoResponse(bb:flatbuffers.ByteBuffer, obj?:PublicKeyInfoResponse):PublicKeyInfoResponse {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new PublicKeyInfoResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

output(obj?:PublicKeyInfo):PublicKeyInfo|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new PublicKeyInfo()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

error():string|null
error(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
error(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startPublicKeyInfoResponse(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addOutput(builder:flatbuffers.Builder, outputOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, outputOffset, 0);
}

static addError(builder:flatbuffers.Builder, errorOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, errorOffset, 0);
}

static endPublicKeyInfoResponse(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createPublicKeyInfoResponse(builder:flatbuffers.Builder, outputOffset:flatbuffers.Offset, errorOffset:flatbuffers.Offset):flatbuffers.Offset {
  PublicKeyInfoResponse.startPublicKeyInfoResponse(builder);
  PublicKeyInfoResponse.addOutput(builder, outputOffset);
  PublicKeyInfoResponse.addError(builder, errorOffset);
  return PublicKeyInfoResponse.endPublicKeyInfoResponse(builder);
}
}
