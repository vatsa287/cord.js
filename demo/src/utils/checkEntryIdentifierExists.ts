import { assert } from 'console'
import * as Cord from '@cord.network/sdk'
import { Bytes } from '@polkadot/types';

/**
 * Checks if the given entry identifier exists or not.
 */
export async function checkEntryIdentifierExistence(
  identifier: string
): Promise<Boolean> {
  const api = Cord.ConfigService.get('api')
//   console.log(`\n❄️  Checking if the entry identifier ${identifier} exists`)

  const encodedIdentifier = api
    .createType<Bytes>('Bytes', identifier)
    .toU8a()

  const exists:Boolean = await api.call.entriesApi.doesIdentifierExists(encodedIdentifier);

  return exists
}
