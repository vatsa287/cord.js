import { HexString } from '@polkadot/util/types.js'

//export const STORE_IDENT = 2348;
export const STORE_PREFIX = "store:cord:";
export type StoreUri = `${typeof STORE_PREFIX}${string}`;
export type StoreEntryDigest = HexString;
