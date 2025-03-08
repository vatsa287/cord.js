import type {
  OverrideBundleDefinition,
  OverrideBundleType,
  OverrideVersionedType,
} from '@polkadot/types/types'

import { types7 } from './types_7.js'
import { types8 } from './types_8.js'
import { types9 } from './types_9.js'
import { calls as didApiCalls } from './runtime/did.js'
import { calls as TransactionWeightApiCalls } from './runtime/weight.js'
import { calls as EntriesApiCalls } from './runtime/entries.js'

import { cordSignedExtensions } from './signedExtensions/index.js'

export { cordSignedExtensions } from './signedExtensions/index.js'
export { calls as didApiCalls } from './runtime/did.js'
export { calls as TransactionWeightApiCalls } from './runtime/weight.js'
export { calls as EntriesApiCalls } from './runtime/entries.js'

export { types7, types8, types9 as types }

const defaultTypesBundle: OverrideVersionedType[] = [
  {
    minmax: [0, 7999],
    types: types7,
  },
  {
    minmax: [8000, 8999],
    types: types8,
  },
  {
    minmax: [9000, undefined],
    types: types9,
  },
]

const sharedBundle: OverrideBundleDefinition = {
  types: defaultTypesBundle,
  signedExtensions: {
    ...cordSignedExtensions,
  },
  runtime: {
    ...didApiCalls,
    ...TransactionWeightApiCalls,
    ...EntriesApiCalls,
  },
}

export const typesBundle: OverrideBundleType = {
  spec: {
    cord: sharedBundle,
    cordGraph: sharedBundle,
    braid: sharedBundle,
    loom: sharedBundle,
    weave: sharedBundle,
    test: sharedBundle,
  },
}
