import * as Cord from '@cord.network/sdk'
import { createAccount } from '../utils/createAccount'

import moment from "moment";

// import readline from 'readline';

import {
  BN
} from 'bn.js';
// import { randomUUID } from 'crypto';
import { UUID } from '@cord.network/utils';

// async function getBalance(address: string, api) {
//   Cord.ConfigService.set({ submitTxResolveOn: Cord.Chain.IS_IN_BLOCK })

//   const { data: balance } = await api.query.system.account(address);
//   return balance.free.toString(); // Returns free balance as a string
// }

async function main() {
  const networkAddress = process.env.NETWORK_ADDRESS
    ? process.env.NETWORK_ADDRESS
    : 'ws://127.0.0.1:9944'

  Cord.ConfigService.set({ submitTxResolveOn: Cord.Chain.IS_IN_BLOCK })
  await Cord.connect(networkAddress)

  const api = Cord.ConfigService.get('api');

  // Step 1: Setup Membership
  // Setup transaction author account - CORD Account.

  console.log(`\n❄️  New Network Member`)
  const authorityAuthorIdentity = Cord.Utils.Crypto.makeKeypairFromUri(
    process.env.ANCHOR_URI ? process.env.ANCHOR_URI : '//Alice',
    'sr25519'
  )

  // Setup network member account.
  const { account: authorIdentity } = await createAccount()
  console.log(`🏦  Member (${authorIdentity.type}): ${authorIdentity.address}`)

  let tx = await api.tx.balances.transferAllowDeath(authorIdentity.address, new BN('9000000000000000000'));
  await Cord.Chain.signAndSubmitTx(tx, authorityAuthorIdentity);

  // Create a Schema
  console.log(`\n❄️  Schema Creation `)
  let newSchemaContent = require('../../res/schema.json')
  let newSchemaName = newSchemaContent.title + ':' + Cord.Utils.UUID.generate()
  newSchemaContent.title = newSchemaName

  let schemaProperties = Cord.SchemaAccounts.buildFromProperties(
    newSchemaContent,
    authorIdentity.address,
  )
  console.dir(schemaProperties, {
    depth: null,
    colors: true,
  })
  const schemaUri = await Cord.SchemaAccounts.dispatchToChain(
    schemaProperties.schema,
    authorIdentity,
  )
  console.log(`✅ Schema - ${schemaUri} - added!`)

  console.log(`\n❄️  Query From Chain - Schema `)
  const schemaFromChain = await Cord.SchemaAccounts.fetchFromChain(
    schemaProperties.schema.$id
  )
  console.dir(schemaFromChain, {
    depth: null,
    colors: true,
  })
  console.log('✅ Schema Functions Completed!')

  // Create a Registry.
  const blob = {
    "name": "Companies Registry",
    "description": "A centralized registry that tracks the registration, incorporation status, and key business details of companies across various industries.",
    "metadata": {
      "category": "business",
      "totalCompaniesRegistered": 15000,
      "industriesCovered": [
        "Technology",
        "Healthcare",
        "Renewable Energy",
        "Finance",
        "Manufacturing"
      ],
      "lastUpdated": "01-10-2024",
      "regulatoryAuthority": "National Business Bureau",
      "registrationRequirements": {
        "documentsNeeded": [
          "Incorporation Certificate",
          "Tax Identification Number",
          "Proof of Address",
          "Board Resolution"
        ],
        "feeStructure": {
          "smallBusiness": "INR500",
          "mediumBusiness": "INR1000",
          "largeBusiness": "INR5000"
        }
      }
    }
  };
  const stringified_blob = JSON.stringify(blob);
  const digest = await Cord.Registries.getDigestFromRawData(stringified_blob);

  // Crreate a Registry Property.
  const registryDetails = await Cord.Registries.registryCreateProperties(
    authorIdentity.address,
    digest,            //digest
    null,              //schemaUri
    stringified_blob,  //blob
  );

  console.log(`\n❄️  Registry Create Details `, registryDetails);
  
  // Dispatch the Registry Property to the chain.
  const registry = await Cord.Registries.dispatchCreateRegistryToChain(
    registryDetails,
    authorIdentity,
  );

  console.log("Registry URI", registryDetails.uri);
    
  console.log('\n✅ Registry created!');

  // Define max number of batchTransactions
  let max = 50;

  let outerBatchStartTime = moment();

  for (let i = 0; i < max; i++) {
    console.log(`\nProcessing outer batch ${i + 1}...`);
    await batchTransactions(api, authorIdentity, registry.uri, registry.authorizationUri);

    //updateStatusBar(i + 1, max);
  }

  let outerBatchEndTime = moment();

  // Total time taken 
  let outerBatchDurationInSeconds = outerBatchEndTime.diff(outerBatchStartTime, 'seconds');
  console.log(`\nTotal time for ${max} batches: ${outerBatchDurationInSeconds} seconds`);

  // console.log("\n Total Entries found", getEntriesCount(api));

}

async function batchTransactions(api: Cord.ApiPromise, authorIdentity: Cord.CordKeyringPair, registryUri: Cord.RegistryUri, registryAuthUri: Cord.RegistryAuthorizationUri, txCount = 1_00_000, perBatch = 10_000) {
  let startTxPrep = moment();
  const initialNonce = (await api.query.system.account(authorIdentity.address)).nonce.toNumber();
  let currentNonce = initialNonce;

  console.log(`\nPreparing and submitting ${txCount} transactions in batches of ${perBatch}...`);

  try {
    
    for (let j = 0; j < Math.ceil(txCount / perBatch); j++) {
      const txBatch = [];

      for (let k = 0; k < perBatch && j * perBatch + k < txCount; k++) {
        //const entryBlob = JSON.stringify({ "data": `"${UUID.generate()}"` });


        const registryEntryDetails = await Cord.Entries.createEntriesProperties(
          authorIdentity.address,
          registryUri,
          registryAuthUri,
          null,     // digest
          `${UUID.generate()}`
          //entryBlob // blob
        );

        const tx = api.tx.entries.create(
          registryEntryDetails.uri.split(":")[2],
          registryEntryDetails.authorizationUri.replace('registryauth:cord:', ''),
          registryEntryDetails.digest,
          registryEntryDetails.blob
        );

        txBatch.push(tx);

        // Show preparation progress
        process.stdout.write(
          `  🔖  Prepared ${(j * perBatch + k + 1)} transactions in ${moment
            .duration(moment().diff(startTxPrep))
            .asSeconds()
            .toFixed(3)}s\r`
        );
      }

      console.log(`\nSubmitting batch ${j + 1}...`);

      // Submit batch immediately
      const batchExtrinsic = api.tx.utility.batchAll(txBatch);

      // Sign the batch with the correct nonce
      await batchExtrinsic.signAsync(authorIdentity, { nonce: new BN(currentNonce) });

      await new Promise((resolve, reject) => {
        batchExtrinsic
          .send((result: Cord.ISubmittableResult) => {
            if (result.status.isInBlock) {
              console.log(`Batch ${j + 1} included in block.`);
              resolve(true);
            } else if (result.status.isFinalized) {
              console.log(`Batch ${j + 1} finalized.`);
              resolve(true);
            } else if (result.isError) {
              console.error(`Batch ${j + 1} failed:`, result.toHuman());
              reject(new Error(`Batch ${j + 1} failed`));
            }
          })
          .catch((err) => {
            console.error(`Batch ${j + 1} submission error:`, err.message);
            reject(err);
          });
      });

      // Increment nonce for the next batch
      currentNonce++;

      // Clear the txBatch array after submission
      txBatch.length = 0;

      if (typeof global.gc === "function") {
        global.gc();
      } else {
        console.warn(
            "Garbage collection is not exposed. Run the script with 'npx tsx --node-arg=--expose-gc dedi-load-test.ts'."
        );
      }

      // Allow Node.js to clean up memory
      //   await new Promise((resolve) => setImmediate(resolve));
      await new Promise(resolve => setTimeout(resolve, 0))

    }
  } catch (e: unknown) {
    if (e instanceof Error) {
        console.error(`Error during transaction preparation or submission: ${e.message}`);
    } else {
        // If the error is not an instance of Error, log a generic message
        console.error('An unknown error occurred during transaction preparation or submission.');
    }
    return 
  }

  const batchDuration = moment.duration(moment().diff(startTxPrep)).asSeconds();
  console.log(`\n  🎁  Anchoring ${txCount} transactions took ${batchDuration.toFixed(3)}s`);
  console.log(`  🙌  Block TPS (batch transactions) - ${Math.round(txCount / batchDuration)} `);
}

// function updateStatusBar(current, total) {
//   const progress = Math.floor((current / total) * 100);
//   const progressBar = '█'.repeat(progress / 2) + ' '.repeat(50 - progress / 2);
//   readline.clearLine(process.stdout, 0);
//   readline.cursorTo(process.stdout, 0);
//   process.stdout.write(`Processing: [${progressBar}] ${progress}% (${current}/${total})`);
// }

main()
  .then(() => console.log('\nBye! 👋 👋 👋 '))
  .finally(Cord.disconnect)

process.on('SIGINT', async () => {
  console.log('\nBye! 👋 👋 👋 \n')
  Cord.disconnect()
  process.exit(0)
})
