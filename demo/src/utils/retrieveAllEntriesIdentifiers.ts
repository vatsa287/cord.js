import * as Cord from '@cord.network/sdk';
import { Bytes } from '@polkadot/types';

/**
 * Retrieves all the identifiers of Registry Entries.
 */
export async function retrieveAllEntriesIdentifiers(): Promise<string[]> {
  const api = Cord.ConfigService.get('api');
  console.log(`\n❄️  Retrieving all Registry Entry Identifiers`);

  // Retrieve all the identifiers of Registry Entries with a runtime call.
  const entriesIdentifiersCodec: Bytes[] = await api.call.entriesApi.retrieveAllIdentifiers();

  // Ensure the return type is properly converted
  const entriesIdentifiers = entriesIdentifiersCodec
    ? entriesIdentifiersCodec.map((identifier: Bytes) => identifier.toUtf8())
    : [];

  return entriesIdentifiers;
}