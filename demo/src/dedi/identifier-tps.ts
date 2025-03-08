import { retrieveAllEntriesIdentifiers } from '../utils/retrieveAllEntriesIdentifiers.ts';
import { checkEntryIdentifierExistence } from '../utils/checkEntryIdentifierExists';
import * as Cord from '@cord.network/sdk';
import moment from 'moment';

async function main() {
  const networkAddress = process.env.NETWORK_ADDRESS || 'ws://127.0.0.1:9933';

  Cord.ConfigService.set({ submitTxResolveOn: Cord.Chain.IS_IN_BLOCK });
  await Cord.connect(networkAddress);

  console.log(`\n🔄 Connecting to ${networkAddress}...`);

  let entriesIdentifiers: string[] = [];

  entriesIdentifiers = await retrieveAllEntriesIdentifiers();
  console.log(`✅ Retrieved ${entriesIdentifiers.length} valid identifiers.`);

  // Add 100 incorrect identifiers to test existence check
  const wrongIdentifiers: string[] = [];
  for (let i = 0; i < 20000; i++) {
    wrongIdentifiers.push(`u222qtyuJHLCMgSNA25GYi4eC2Ugci6fbeBZcDxFnq${i}`);
  }
  entriesIdentifiers = [...entriesIdentifiers, ...wrongIdentifiers];

  if (entriesIdentifiers.length === 0) {
    console.log(`❌ No identifiers found.`);
    return;
  }

  let startTime = moment();

  const existsResults = await Promise.all(
  entriesIdentifiers.map(async (identifier) => {
  try {
    const exists = await checkEntryIdentifierExistence(identifier);
    // console.log(`Identifier ${identifier} exists: ${exists}`);
    return exists.valueOf(); 
   } catch (error) {
    console.error(`⚠️ Error checking identifier ${identifier}:`, error.message);
    return false; 
   }})
  );

  const endTime = moment();

  // Count true/false results
  const countExists = existsResults.filter(Boolean).length;
  const countNotExists = existsResults.length - countExists;

  console.log(`\n🔍 Results:`);
  console.log(`✅ Exists: ${countExists}`);
  console.log(`❌ Does Not Exist: ${countNotExists}`);

  // Calculate TPS (Transactions Per Second)
  let totalTime = endTime.diff(startTime, 'seconds');
  const tps = entriesIdentifiers.length / totalTime;

  console.log(`⚡ TPS (Transactions Per Second): ${tps.toFixed(2)}`);
}

main()
  .then(() => console.log('\nBye! 👋 👋 👋 '))
  .finally(Cord.disconnect);

process.on('SIGINT', async () => {
  console.log('\nBye! 👋 👋 👋 \n');
  Cord.disconnect();
  process.exit(0);
});
