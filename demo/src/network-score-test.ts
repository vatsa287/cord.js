import * as Cord from '@cord.network/sdk'
import { createDid } from './utils/generateDid'
import { createDidName } from './utils/generateDidName'
import { getDidDocFromName } from './utils/queryDidName'
import { addNetworkMember } from './utils/createAuthorities'
import { createAccount } from './utils/createAccount'

async function main() {
  const networkAddress = process.env.NETWORK_ADDRESS ? process.env.NETWORK_ADDRESS : 'ws://127.0.0.1:9944';
  Cord.ConfigService.set({ submitTxResolveOn: Cord.Chain.IS_IN_BLOCK })
  await Cord.connect(networkAddress)
  const devAuthorIdentity = Cord.Utils.Crypto.makeKeypairFromUri(
    process.env.ANCHOR_URI ? process.env.ANCHOR_URI : '//Alice',
    'sr25519'
  )
  console.log(`\n🌐 Network Score Initial Setup`)

  console.log(`\n🎎 Particpants `)
  const { account: networkAuthorIdentity } = createAccount(
    Cord.Utils.Crypto.mnemonicGenerate()
  )
  console.log(
    `🔐 Network Member (${devAuthorIdentity.type}): ${devAuthorIdentity.address}`
  )
  await addNetworkMember(devAuthorIdentity, networkAuthorIdentity.address)
  console.log('✅ Network Membership Approved! 🎉\n')

  const { mnemonic: chainSpaceAdminMnemonic, document: chainSpaceAdminDid } =
    await createDid(networkAuthorIdentity)
  const chainSpaceAdminKeys = Cord.Utils.Keys.generateKeypairs(chainSpaceAdminMnemonic, 'sr25519')
  console.log(
    `🔐  Network Score Admin (${chainSpaceAdminDid.authentication[0].type}): ${chainSpaceAdminDid.uri}`
  )
  const { mnemonic: networkProviderMnemonic, document: networkProviderDid } =
    await createDid(networkAuthorIdentity)
  const networkProviderKeys = Cord.Utils.Keys.generateKeypairs(networkProviderMnemonic, 'sr25519')
  console.log(
    `🔐  Network Participant (Provider) (${networkProviderDid.authentication[0].type}): ${networkProviderDid.uri}`
  )

  const { mnemonic: networkAuthorMnemonic, document: networkAuthorDid } =
    await createDid(networkAuthorIdentity)
  const networkAuthorKeys = Cord.Utils.Keys.generateKeypairs(networkAuthorMnemonic, 'sr25519')
  console.log(
    `🔐 Network Author (API -> Node) (${networkAuthorDid.authentication[0].type}): ${networkAuthorDid.uri}`
  )

  console.log('✅ Network Members created! 🎉')

  // uncomment to enable DID name creation
  // console.log(`\n❄️  Network Participant DID name Creation `)
  // const randomDidName = `solar.sailer.${randomUUID().substring(0, 4)}@cord`

  // await createDidName(
  //   networkParticipantDid.uri,
  //   networkAuthorIdentity,
  //   randomDidName,
  //   async ({ data }) => ({
  //     signature: networkParticipantKeys.authentication.sign(data),
  //     keyType: networkParticipantKeys.authentication.type,
  //   })
  // )
  // console.log(`✅ Network Participant DID name - ${randomDidName} - created!`)
  // await getDidDocFromName(randomDidName)

  console.log(`\n🌐  Network Score Chain Space Creation `)
  const spaceProperties = await Cord.ChainSpace.buildFromProperties(
    chainSpaceAdminDid.uri
  )
  console.dir(spaceProperties, {
    depth: null,
    colors: true,
  })

  const chainSpace = await Cord.ChainSpace.dispatchToChain(
    spaceProperties,
    chainSpaceAdminDid.uri,
    devAuthorIdentity,
    async ({ data }) => ({
      signature: chainSpaceAdminKeys.authentication.sign(data),
      keyType: chainSpaceAdminKeys.authentication.type,
    })
  )
  console.log('✅ Chain Space created! 🎉')

  await Cord.ChainSpace.sudoApproveChainSpace(
    devAuthorIdentity,
    chainSpace.uri,
    1000
  )

  console.log(`\n🌐  Chain Space Authorization (Author) `)
  const permission: Cord.PermissionType = Cord.Permission.ASSERT
  const spaceAuthProperties =
    await Cord.ChainSpace.buildFromAuthorizationProperties(
      chainSpace.uri,
      networkAuthorDid.uri,
      permission,
      chainSpaceAdminDid.uri
    )
  console.dir(spaceAuthProperties, {
    depth: null,
    colors: true,
  })

  const delegateAuth = await Cord.ChainSpace.dispatchDelegateAuthorization(
    spaceAuthProperties,
    networkAuthorIdentity,
    chainSpace.authorization,
    async ({ data }) => ({
      signature: chainSpaceAdminKeys.capabilityDelegation.sign(data),
      keyType: chainSpaceAdminKeys.capabilityDelegation.type,
    })
  )
  console.log(`✅ Chain Space Authorization Approved! 🎉`)

  console.log(`\n🌐  Query From Chain - Chain Space `)
  const spaceFromChain = await Cord.ChainSpace.fetchFromChain(chainSpace.uri)
  console.dir(spaceFromChain, {
    depth: null,
    colors: true,
  })

  console.log(`\n🌐  Query From Chain - Chain Space Authorization `)
  const spaceAuthFromChain = await Cord.ChainSpace.fetchAuthorizationFromChain(
    delegateAuth as Cord.AuthorizationUri
  )
  console.dir(spaceAuthFromChain, {
    depth: null,
    colors: true,
  })

  console.log(`✅ Initial Setup Completed! 🎊`)

  console.log(`\n⏳ Network Rating Transaction Flow`)

  console.log(`\n💠  Write Rating - (Genesis) Credit Entry `)
  let ratingContent: Cord.IRatingContent = {
    entityId: Cord.Utils.UUID.generate(),
    providerId: Cord.Utils.UUID.generate(),
    ratingType: Cord.RatingTypeOf.delivery,
    countOfTxn: 100,
    totalRating: 320,
  }

  console.dir(ratingContent, {
    depth: null,
    colors: true,
  })
  const entryDigest = Cord.Utils.Crypto.hashObjectAsHexStr(ratingContent);
  const { totalRating, ...restOfRating} = ratingContent;
  
  let transformedEntry: Cord.IRatingEntry = {
    entry: {
      ...restOfRating,
      providerDid: networkProviderDid.uri.replace('did:cord:', ''),
      totalEncodedRating: Math.round(totalRating * 10),
    },
    messageId: Cord.Utils.UUID.generate(),
    entryDigest,
  };

  console.log(`\n🌐  Rating Information to API endpoint (/write-ratings) `)
  console.dir(transformedEntry, {
    depth: null,
    colors: true,
  })

  let dispatchEntry = await Cord.Score.buildFromRatingProperties(
    transformedEntry,
    chainSpace.uri,
    networkAuthorDid.uri,
  )

  console.log(`\n🌐  Rating Information to Ledger (API -> Ledger) `)
  console.dir(dispatchEntry, {
    depth: null,
    colors: true,
  })

  let ratingUri = await Cord.Score.dispatchRatingToChain(
    dispatchEntry.details,
    networkAuthorIdentity,
    delegateAuth as Cord.AuthorizationUri,
    async ({ data }) => ({
      signature: networkAuthorKeys.authentication.sign(data),
      keyType: networkAuthorKeys.authentication.type,
    })
  )

  if (Cord.Identifier.isValidIdentifier(ratingUri)) {
    console.log('✅ Rating addition successful! 🎉')
  } else {
    console.log(`🚫 Ledger Anchoring failed! " 🚫`)
  }

  console.log(`\n💠  Revoke Rating - Debit Entry `)
  const revokeInput = {
    entryUri: ratingUri,
    entityId: transformedEntry.entry.entityId,
  }
  console.dir(revokeInput, {
    depth: null,
    colors: true,
  })

  /* msgId can be decided by application */
  const msgId = `msg-${Cord.Utils.UUID.generate()}`
  const transactionTime = new Date().toISOString()

  /* this is used for digest, but its again eco-system policy */
  const entryTransform = { entryUri: ratingUri, msgId, provider: networkProviderDid.uri, transactionTime }

  const revokeDigest = Cord.Utils.Crypto.hashObjectAsHexStr(entryTransform)

  const revokeRatingEntry: Cord.IRatingRevokeEntry = {
      entry: {
        messageId: msgId,
        entryDigest: revokeDigest,
        referenceId: ratingUri,
      },
      entityId: transformedEntry.entry.entityId,
      providerDid: networkProviderDid.uri,
    }

  console.log(
    `\n🌐  Rating Revoke (Debit) Information to API endpoint (/amend-ratings) `
  )
  console.dir(revokeRatingEntry, {
    depth: null,
    colors: true,
  })

  const revokeRatingDispatchEntry =
    await Cord.Score.buildFromRevokeRatingProperties(
      revokeRatingEntry,
      chainSpace.uri,
      networkAuthorDid.uri,
    )
  console.log(
    `\n🌐  Rating Revoke (Debit) Information to Ledger (API -> Ledger) `
  )
  console.dir(revokeRatingDispatchEntry, {
    depth: null,
    colors: true,
  })

  let revokedRatingUri = await Cord.Score.dispatchRevokeRatingToChain(
    revokeRatingDispatchEntry.details,
    networkAuthorIdentity,
    delegateAuth as Cord.AuthorizationUri,
    async ({ data }) => ({
      signature: networkAuthorKeys.authentication.sign(data),
      keyType: networkAuthorKeys.authentication.type,
    })
  )

  if (Cord.Identifier.isValidIdentifier(revokedRatingUri)) {
    console.log('✅ Rating Revoke (Debit) successful! 🎉')
  } else {
    console.log(`🚫 Debit Anchoring failed! " 🚫`)
  }

  console.log(`\n💠  Revised Rating - Credit Entry\n`)

  let revisedRatingContent = {
    ...ratingContent,
    providerDid: transformedEntry.entry.providerDid,
    referenceId: revokedRatingUri,
    countOfTxn: 80,
    totalRating: 280,
  }

  console.dir(revisedRatingContent, {
    depth: null,
    colors: true,
  })
  
  const revisedEntryDigest = Cord.Utils.Crypto.hashObjectAsHexStr(revisedRatingContent);
  
  let transformedRevisedEntry = {
    entry: {
      ...revisedRatingContent,
      referenceId: revokedRatingUri,
      totalEncodedRating: Math.round(revisedRatingContent.totalRating * 10),
    },
    messageId: Cord.Utils.UUID.generate(),
    referenceId: revokedRatingUri,
    entryDigest: revisedEntryDigest,
  };

  delete transformedRevisedEntry.entry.totalRating;
  
  console.log(
    `\n🌐  Rating Revised(Credit) Information to API endpoint (/write-ratings)\n`
  )

  let dispatchRevisedEntry = await Cord.Score.buildFromReviseRatingProperties(
    transformedRevisedEntry,
    chainSpace.uri,
    networkAuthorDid.uri,
  )

  console.dir(dispatchRevisedEntry, {
    depth: null,
    colors: true,
  })

  console.log(
    `\n🌐  Rating Revised(Credit) Information to Ledger (API -> Ledger) `
  )

  let revisedRatingUri = await Cord.Score.dispatchReviseRatingToChain(
    dispatchRevisedEntry.details,
    networkAuthorIdentity,
    delegateAuth as Cord.AuthorizationUri,
    async ({ data }) => ({
      signature: networkAuthorKeys.authentication.sign(data),
      keyType: networkAuthorKeys.authentication.type,
    })
  )

  if (Cord.Identifier.isValidIdentifier(revisedRatingUri)) {
    console.log('\n✅ Rating Revision(Credit) successful! 🎉')
  } else {
    console.log(`\n🚫 Revision Anchoring failed! " 🚫`)
  }

  console.log(`\n🌐  Query From Chain - Rating Entry `)
  const ratingEntryFromChain = await Cord.Score.fetchRatingDetailsfromChain(
    revisedRatingUri,
    'Asia/Kolkata'
  )
  console.dir(ratingEntryFromChain, {
    depth: null,
    colors: true,
  })

  console.log(`\n🌐  Query From Chain - Aggregate Score `)
  const aggregateScoreFromChain =
    await Cord.Score.fetchEntityAggregateScorefromChain(
      ratingContent.entityId,
      //Cord.RatingTypeOf.invalid
    )
  console.dir(aggregateScoreFromChain, {
    depth: null,
    colors: true,
  })

  console.log(`\n🌐  Query From Chain - Chain Space Usage `)
  const spaceUsageFromChain = await Cord.ChainSpace.fetchFromChain(
    chainSpace.uri
  )
  console.dir(spaceUsageFromChain, {
    depth: null,
    colors: true,
  })
}
main()
  .then(() => console.log('\nBye! 👋 👋 👋 '))
  .finally(Cord.disconnect)

process.on('SIGINT', async () => {
  console.log('\nBye! 👋 👋 👋 \n')
  Cord.disconnect()
  process.exit(0)
})
