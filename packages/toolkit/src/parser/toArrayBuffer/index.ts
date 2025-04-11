// @__NO_SIDE_EFFECTS__
export function toArrayBuffer(buffer: Buffer): ArrayBuffer | SharedArrayBuffer {
  const { buffer: arrayBuffer, byteOffset, byteLength } = buffer
  return arrayBuffer.slice(byteOffset, byteOffset + byteLength)
}
