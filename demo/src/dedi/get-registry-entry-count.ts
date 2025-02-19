import * as Cord from '@cord.network/sdk';
import { StorageKey, Option } from '@polkadot/types';
import { PalletEntriesRegistryEntryDetails } from '@cord.network/augment-api';
import { DecoderUtils } from '@cord.network/utils';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

const program = new Command();

// Setup CLI arguments
program
  .option('-r, --registry-id <string>', 'The registry ID to count entries for')
  .option('-n, --network <string>', 'The network address', 'wss://weave1.testnet.cord.network');

program.parse(process.argv);
const options = program.opts();

if (!options.registryId) {
  console.error('Error: registry-id is required. Use -r or --registry-id to specify it.');
  process.exit(1);
}

// Logging setup
const logFilePath = path.join(process.cwd(), 'log', `registry_entries_count_log_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`);
const logDirPath = path.dirname(logFilePath);

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath, { recursive: true });
}

const logToFile = (message: any) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${formatMessage(message)}\n`;
  fs.appendFileSync(logFilePath, logMessage);
};

const formatMessage = (message: any): string => {
  if (typeof message === 'object') {
    return JSON.stringify(message, null, 2); 
  }
  return message.toString();
};

const log = (...args: any[]) => {
  const message = args.map(arg => formatMessage(arg)).join(' ');
  logToFile(message); 
  console.log(...args); 
};

async function main() {
  try {
    const networkAddress = options.network;
    const targetRegistryId = options.registryId;

    Cord.ConfigService.set({ submitTxResolveOn: Cord.Chain.IS_IN_BLOCK });
    await Cord.connect(networkAddress);

    const api = Cord.ConfigService.get('api');
    let registryEntriesCountStartTime = moment();

    console.log(`Counting registry entries for registry ID: ${targetRegistryId}...`);
    const registryEntriesCount = await getRegistryEntriesCountByRegistryId(api, targetRegistryId);
    log("Total number of registry entries found for registry ID:", targetRegistryId, "is", registryEntriesCount);

    let registryEntriesCountStopTime = moment();
    let timePassedInSeconds = registryEntriesCountStopTime.diff(registryEntriesCountStartTime, 'seconds');
    log(`\nTotal time for counting: ${timePassedInSeconds} seconds`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      log(`Error in main function: ${error.message}`);
    }
  } finally {
    await Cord.disconnect();
    log('\nBye! 👋 👋 👋 ');
  }
}

async function getRegistryEntriesCountByRegistryId(
  api: Cord.ApiPromise,
  targetRegistryId: string
): Promise<number> {
  let registryEntriesCount = 0;
  let startKey: string | undefined;

  try {
    while (true) {
      // Fetch paginated keys
      const keys: StorageKey<[Cord.Bytes]>[] = await api.query.entries.registryEntries.keysPaged({
        pageSize: 1000,
        args: [],
        startKey: startKey,
      });

      console.log(`Processing ${keys.length} keys...`);

      if (keys.length === 0) {
        break;
      }

      for (const key of keys) {
        const encoded = await api.query.entries.registryEntries<Option<PalletEntriesRegistryEntryDetails>>(key.args[0]);

        // Decode the entry details
        const registryId = decodeRegistryEntryDetailsFromChain(encoded, key.args[0].toHex());

        // Check if the registry_id matches the target
        if (registryId === targetRegistryId) {
          registryEntriesCount++;
        }
      }

      // Update the start key for the next batch
      startKey = keys[keys.length - 1].toHex();
      log(`Processed ${registryEntriesCount} matching entries so far...`);
    }
  } catch (error) {
    console.error('Error querying registry entries:', error);
  }

  return registryEntriesCount;
}

// Decoding function (reuse your implementation)
export function decodeRegistryEntryDetailsFromChain(
  encoded: Option<PalletEntriesRegistryEntryDetails>,
  identifier: string
): string | null {
  if (encoded.isNone) {
    return null; 
  }

  const chainRegistryEntry = encoded.unwrap();
  return DecoderUtils.hexToString(chainRegistryEntry.registryId.toString());
}

main()
  .then(() => log('\nBye! 👋 👋 👋 '))
  .finally(() => Cord.disconnect());

process.on('SIGINT', async () => {
  log('\nBye! 👋 👋 👋 \n');
  Cord.disconnect();
  process.exit(0);
});
