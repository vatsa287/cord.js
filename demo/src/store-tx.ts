import * as Cord from '@cord.network/sdk'
// import { UUID, Crypto } from '@cord.network/utils'
import { createDid } from './utils/generateDid'
import { createDidName } from './utils/generateDidName'
import { getDidDocFromName } from './utils/queryDidName'
import { randomUUID } from 'crypto'
import { addNetworkMember } from './utils/createAuthorities'
import { createAccount } from './utils/createAccount'

import {
  BN
} from 'bn.js';

async function main() {
  const networkAddress = process.env.NETWORK_ADDRESS
    ? process.env.NETWORK_ADDRESS
    : 'ws://127.0.0.1:9944'
  //  const networkAddress = 'ws://127.0.0.1:9944'
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
  await addNetworkMember(authorityAuthorIdentity, authorIdentity.address)
  console.log(`🔏  Member permissions updated`)


  // Step 2: Setup Identities
  console.log(`\n❄️  Demo Identities (KeyRing)`)

  let tx = await api.tx.balances.transferAllowDeath(authorIdentity.address, new BN('1000000000000000000'));

  await Cord.Chain.signAndSubmitTx(tx, authorityAuthorIdentity);

  // Create issuer DID
  const { mnemonic: issuerMnemonic, document: issuerDid } =
    await createDid(authorIdentity)
  const issuerKeys = Cord.Utils.Keys.generateKeypairs(issuerMnemonic, 'sr25519')
  console.log(
    `🏛   Issuer (${issuerDid?.assertionMethod![0].type}): ${issuerDid.uri}`
  )
  const conformingDidDocument = Cord.Did.exportToDidDocument(
    issuerDid,
    'application/json'
  )
  console.dir(conformingDidDocument, {
    depth: null,
    colors: true,
  })

  console.log('✅ Identities created!')

  // Step 2: Create a DID name for Issuer
  console.log(`\n❄️  DID name Creation `)
  const randomDidName = `solar.sailer.${randomUUID().substring(0, 4)}@cord`

  await createDidName(
    issuerDid.uri,
    authorIdentity,
    randomDidName,
    async ({ data }) => ({
      signature: issuerKeys.authentication.sign(data),
      keyType: issuerKeys.authentication.type,
    })
  )
  console.log(`✅ DID name - ${randomDidName} - created!`)
  await getDidDocFromName(randomDidName)

  // Step 3: Create a new Chain Space
  console.log(`\n❄️  Chain Space Creation `)
  const spaceProperties = await Cord.ChainSpace.buildFromProperties(
    issuerDid.uri
  )
  console.dir(spaceProperties, {
    depth: null,
    colors: true,
  })

  console.log(`\n❄️  Chain Space Properties `)
  const space = await Cord.ChainSpace.dispatchToChain(
    spaceProperties,
    issuerDid.uri,
    authorIdentity,
    async ({ data }) => ({
      signature: issuerKeys.authentication.sign(data),
      keyType: issuerKeys.authentication.type,
    })
  )
  console.dir(space, {
    depth: null,
    colors: true,
  })
  console.log('✅ Chain Space created!')

  console.log(`\n❄️  Chain Space Approval `)
  await Cord.ChainSpace.sudoApproveChainSpace(
    authorityAuthorIdentity,
    space.uri,
    1000
  )
  console.log(`✅  Chain Space Approved`)

  /* Below to test size limit of the raw_data */
  // function generateLargeString(size: number): string {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let result = '';
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < size; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  // const sizeInBytes: number = 1048576; // 1 MB
  // const largeString: string = generateLargeString(sizeInBytes);
  // console.log("large string", largeString);
  //let identifier = Cord.Utils.UUID.generate();

  let identifier = "Entry1";
  const raw_data = "Hello world!"

  const storeEntryDigestSha256 = Cord.Store.getDigestFromRawDataSha256(raw_data);
  const storeEntryDigestBlake = await Cord.Store.getDigestFromRawDataBlake(raw_data);
  const storeEntryDigestBlake2 = Cord.Store.getDigestFromRawDataBlake2(raw_data);
  
  console.log(`SHA256 ${storeEntryDigestSha256}, BLAKE2 Method1: ${storeEntryDigestBlake}, BLAKE2 Method2: ${storeEntryDigestBlake2}`);

  console.log("\n❄️  Adding store entry");

  const create1_extrinsic = await Cord.Store.dispatchAddToChain(
    issuerDid.uri,
    identifier,
    storeEntryDigestBlake,
    raw_data,
    space.authorization,
    authorIdentity,
    async ({ data }) => ({
      signature: issuerKeys.authentication.sign(data),
      keyType: issuerKeys.authentication.type,
    })
  )

  console.log('✅ Store Entry created!')

  console.log(`\n❄️  Updating Store Entry `)

  const updated_raw_data = "Hello world! From Typescript";
  const storeUpdatedEntryDigestBlake = await Cord.Store.getDigestFromRawDataBlake(updated_raw_data);

  const update_extrinsic = await Cord.Store.dispatchUpdateToChain(
    issuerDid.uri,
    identifier,
    storeUpdatedEntryDigestBlake,
    space.authorization,
    authorIdentity,
    async ({ data }) => ({
      signature: issuerKeys.authentication.sign(data),
      keyType: issuerKeys.authentication.type,
    })
  )

  console.log('✅ Store Entry updated!')

  console.log(`\n❄️  Adding Store Entry with same data & different identifier`)

  let entry2_identifier = "Entry2";

  const create2_extrinsic = await Cord.Store.dispatchAddToChain(
    issuerDid.uri,
    entry2_identifier,
    storeUpdatedEntryDigestBlake,
    updated_raw_data,
    space.authorization,
    authorIdentity,
    async ({ data }) => ({
      signature: issuerKeys.authentication.sign(data),
      keyType: issuerKeys.authentication.type,
    })
  )

  console.log('✅ Store Entry 2 created!')

  console.log(`\n❄️  Redacting Store Entries`)

  const redact_extrinsic1 = await Cord.Store.dispatchRedactToChain(
    issuerDid.uri,
    identifier,
    authorIdentity,
    async ({ data }) => ({
      signature: issuerKeys.authentication.sign(data),
      keyType: issuerKeys.authentication.type,
    })
  )

  const redact_extrinsic2 = await Cord.Store.dispatchRedactToChain(
    issuerDid.uri,
    entry2_identifier,
    authorIdentity,
    async ({ data }) => ({
      signature: issuerKeys.authentication.sign(data),
      keyType: issuerKeys.authentication.type,
    })
  )

  console.log('✅ Store Entries redacted!')

}

main()
  .then(() => console.log('\nBye! 👋 👋 👋 '))
  .finally(Cord.disconnect)

process.on('SIGINT', async () => {
  console.log('\nBye! 👋 👋 👋 \n')
  Cord.disconnect()
  process.exit(0)
})
