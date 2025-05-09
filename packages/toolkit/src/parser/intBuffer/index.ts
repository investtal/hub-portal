import { intToHex } from "../intHex"

/**
 * Transform an integer into a Buffer
 *
 * @param {number | bigint} integer the input value
 * @returns {Buffer} the buffer after convert
 */
// @__NO_SIDE_EFFECTS__
export function intToBuffer(integer: number | bigint): Buffer {
  const hex = intToHex(integer)
  return Buffer.from(hex, "hex")
}
