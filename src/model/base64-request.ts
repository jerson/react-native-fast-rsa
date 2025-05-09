// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class Base64Request {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Base64Request {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsBase64Request(bb:flatbuffers.ByteBuffer, obj?:Base64Request):Base64Request {
  return (obj || new Base64Request()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsBase64Request(bb:flatbuffers.ByteBuffer, obj?:Base64Request):Base64Request {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Base64Request()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

message():string|null
message(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
message(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startBase64Request(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addMessage(builder:flatbuffers.Builder, messageOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, messageOffset, 0);
}

static endBase64Request(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createBase64Request(builder:flatbuffers.Builder, messageOffset:flatbuffers.Offset):flatbuffers.Offset {
  Base64Request.startBase64Request(builder);
  Base64Request.addMessage(builder, messageOffset);
  return Base64Request.endBase64Request(builder);
}
}
