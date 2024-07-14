/**
 * @packageDocumentation
 * @module Store
 *
 * <Add documentation>
 *
 * The module's functionality is exposed through a set of exportable functions, which can be integrated into
 * broader applications within the Cord Network ecosystem or other blockchain-based systems that require
 * sophisticated store management capabilities.
 */

// import {
//   Bytes
// } from '@cord.network/types'

// import { blake2AsHex } from '@polkadot/util-crypto';

import { ConfigService } from '@cord.network/config'

import { blake2AsHex, Bytes } from '@cord.network/types'

/* Export digest from the give raw data as H256 */
export async function getDigestFromRawDataBlake (
  raw_data: string
) {
  const api = ConfigService.get('api')
  const scaleEncodedRawData = api
    .createType<Bytes>('Bytes', raw_data)
    .toU8a()
  const storeEntryDigest = blake2AsHex(
    Uint8Array.from([
      ...scaleEncodedRawData
    ]));

  return storeEntryDigest
}

import { blake2AsU8a } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

// Define the function to compute the digest from raw data
export function getDigestFromRawDataBlake2(raw_data: string): string {
  // Convert raw data string to a Uint8Array using TextEncoder (UTF-8 encoding)
  const rawDataBytes = new TextEncoder().encode(raw_data);

  // Compute the Blake2b hash with a 256-bit output
  const rawDataDigestU8a = blake2AsU8a(rawDataBytes, 256);

  // Convert the Uint8Array to a hex string
  const rawDataDigestHex = u8aToHex(rawDataDigestU8a);

  return rawDataDigestHex;
}


// export function getDigestFromRawData(rawData: string): string {
//   // Convert the string to Uint8Array (UTF-8 encoding)
//   const rawDataU8a = new TextEncoder().encode(rawData);

//   // Encode the raw data in SCALE format
//   // In this case, it’s just a direct encoding of the raw data bytes
//   // Convert rawData to the SCALE encoded format
//   const scaleEncodedRawData = new Uint8Array([rawDataU8a.length, ...rawDataU8a]);  // LENGTH_PREFIX + rawData

//   // Hash the encoded data using Blake2b with a 256-bit output
//   const storeEntryDigest = blake2AsU8a(scaleEncodedRawData, 256);

//   // Convert the hash to a hex string
//   return u8aToHex(storeEntryDigest, -1, undefined);
// }

import { createHash } from 'crypto';

export function getDigestFromRawDataSha256(rawData: string): string {
  // Create a SHA-256 hash object
  const hasher = createHash('sha256');

  // Update the hash with the input message
  hasher.update(rawData);

  // Finalize the hash and get the hexadecimal string
  const sha256Digest = hasher.digest('hex');

  // Add the '0x' prefix
  const hexResult = `0x${sha256Digest}`;

  return hexResult;
}
