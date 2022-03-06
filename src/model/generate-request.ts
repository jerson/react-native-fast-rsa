// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class GenerateRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):GenerateRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsGenerateRequest(bb:flatbuffers.ByteBuffer, obj?:GenerateRequest):GenerateRequest {
  return (obj || new GenerateRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsGenerateRequest(bb:flatbuffers.ByteBuffer, obj?:GenerateRequest):GenerateRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new GenerateRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

nBits():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

mutate_n_bits(value:number):boolean {
  const offset = this.bb!.__offset(this.bb_pos, 4);

  if (offset === 0) {
    return false;
  }

  this.bb!.writeInt32(this.bb_pos + offset, value);
  return true;
}

static startGenerateRequest(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addNBits(builder:flatbuffers.Builder, nBits:number) {
  builder.addFieldInt32(0, nBits, 0);
}

static endGenerateRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createGenerateRequest(builder:flatbuffers.Builder, nBits:number):flatbuffers.Offset {
  GenerateRequest.startGenerateRequest(builder);
  GenerateRequest.addNBits(builder, nBits);
  return GenerateRequest.endGenerateRequest(builder);
}
}
