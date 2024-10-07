// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/types/registry';

import type { AuthorityMembershipCall, AuthorityMembershipError, AuthorityMembershipEvent, CordIdentifierCallTypeOf, CordIdentifierError, CordIdentifierEventEntry, CordIdentifierIdentifierTypeOf, CordIdentifierTimepoint, CordLoomRuntimeMaxNewKeyAgreementKeys, CordLoomRuntimeOriginCaller, CordLoomRuntimeRuntime, CordLoomRuntimeRuntimeFreezeReason, CordLoomRuntimeRuntimeHoldReason, CordLoomRuntimeSessionKeys, FinalityGrandpaEquivocationPrecommit, FinalityGrandpaEquivocationPrevote, FinalityGrandpaPrecommit, FinalityGrandpaPrevote, FrameSupportDispatchDispatchClass, FrameSupportDispatchDispatchInfo, FrameSupportDispatchPays, FrameSupportDispatchPerDispatchClassU32, FrameSupportDispatchPerDispatchClassWeight, FrameSupportDispatchPerDispatchClassWeightsPerClass, FrameSupportDispatchRawOrigin, FrameSupportPalletId, FrameSupportPreimagesBounded, FrameSupportTokensFungibleUnionOfNativeOrWithId, FrameSupportTokensMiscBalanceStatus, FrameSupportTokensMiscIdAmountRuntimeFreezeReason, FrameSupportTokensMiscIdAmountRuntimeHoldReason, FrameSystemAccountInfo, FrameSystemCall, FrameSystemCodeUpgradeAuthorization, FrameSystemError, FrameSystemEvent, FrameSystemEventRecord, FrameSystemExtensionsCheckGenesis, FrameSystemExtensionsCheckNonZeroSender, FrameSystemExtensionsCheckNonce, FrameSystemExtensionsCheckSpecVersion, FrameSystemExtensionsCheckTxVersion, FrameSystemExtensionsCheckWeight, FrameSystemLastRuntimeUpgradeInfo, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, FrameSystemLimitsWeightsPerClass, FrameSystemPhase, PalletAssetConversionCall, PalletAssetConversionError, PalletAssetConversionEvent, PalletAssetConversionPoolInfo, PalletAssetsAccountStatus, PalletAssetsApproval, PalletAssetsAssetAccount, PalletAssetsAssetDetails, PalletAssetsAssetMetadata, PalletAssetsAssetStatus, PalletAssetsCall, PalletAssetsError, PalletAssetsEvent, PalletAssetsExistenceReason, PalletBabeCall, PalletBabeError, PalletBalancesAccountData, PalletBalancesAdjustmentDirection, PalletBalancesBalanceLock, PalletBalancesCall, PalletBalancesError, PalletBalancesEvent, PalletBalancesReasons, PalletBalancesReserveData, PalletChainSpaceCall, PalletChainSpaceError, PalletChainSpaceEvent, PalletChainSpacePermissions, PalletChainSpaceSpaceAuthorization, PalletChainSpaceSpaceDetails, PalletCollectiveCall, PalletCollectiveError, PalletCollectiveEvent, PalletCollectiveRawOrigin, PalletCollectiveVotes, PalletContractsCall, PalletContractsEnvironment, PalletContractsEnvironmentTypeAccountId32, PalletContractsEnvironmentTypeBlakeTwo256, PalletContractsEnvironmentTypeH256, PalletContractsEnvironmentTypeU128, PalletContractsEnvironmentTypeU32, PalletContractsEnvironmentTypeU64, PalletContractsError, PalletContractsEvent, PalletContractsHoldReason, PalletContractsOrigin, PalletContractsSchedule, PalletContractsScheduleInstructionWeights, PalletContractsScheduleLimits, PalletContractsStorageContractInfo, PalletContractsStorageDeletionQueueManager, PalletContractsWasmCodeInfo, PalletContractsWasmDeterminism, PalletDidCall, PalletDidDidDetails, PalletDidDidDetailsDidAuthorizedCallOperation, PalletDidDidDetailsDidCreationDetails, PalletDidDidDetailsDidEncryptionKey, PalletDidDidDetailsDidPublicKey, PalletDidDidDetailsDidPublicKeyDetails, PalletDidDidDetailsDidSignature, PalletDidDidDetailsDidVerificationKey, PalletDidError, PalletDidEvent, PalletDidNameCall, PalletDidNameDidNameDidNameOwnership, PalletDidNameError, PalletDidNameEvent, PalletDidOriginDidRawOrigin, PalletDidServiceEndpointsDidEndpoint, PalletEntriesCall, PalletEntriesError, PalletEntriesEvent, PalletEntriesRegistryEntryDetails, PalletGrandpaCall, PalletGrandpaError, PalletGrandpaEvent, PalletGrandpaStoredPendingChange, PalletGrandpaStoredState, PalletIdentityAuthorityProperties, PalletIdentityCall, PalletIdentityError, PalletIdentityEvent, PalletIdentityJudgement, PalletIdentityLegacyIdentityInfo, PalletIdentityRegistrarInfo, PalletIdentityRegistration, PalletImOnlineCall, PalletImOnlineError, PalletImOnlineEvent, PalletImOnlineHeartbeat, PalletImOnlineSr25519AppSr25519Public, PalletImOnlineSr25519AppSr25519Signature, PalletIndicesCall, PalletIndicesError, PalletIndicesEvent, PalletMembershipCall, PalletMembershipError, PalletMembershipEvent, PalletMultisigCall, PalletMultisigError, PalletMultisigEvent, PalletMultisigMultisig, PalletMultisigTimepoint, PalletNetworkMembershipCall, PalletNetworkMembershipCheckNetworkMembership, PalletNetworkMembershipError, PalletNetworkMembershipEvent, PalletNetworkMembershipMemberData, PalletNetworkScoreAggregatedEntryOf, PalletNetworkScoreCall, PalletNetworkScoreEntryTypeOf, PalletNetworkScoreError, PalletNetworkScoreEvent, PalletNetworkScoreRatingEntry, PalletNetworkScoreRatingInputEntry, PalletNetworkScoreRatingTypeOf, PalletNodeAuthorizationCall, PalletNodeAuthorizationError, PalletNodeAuthorizationEvent, PalletNodeAuthorizationNodeInfo, PalletOffencesEvent, PalletPreimageCall, PalletPreimageError, PalletPreimageEvent, PalletPreimageHoldReason, PalletPreimageOldRequestStatus, PalletPreimageRequestStatus, PalletRegistriesCall, PalletRegistriesError, PalletRegistriesEvent, PalletRegistriesPermissions, PalletRegistriesRegistryAuthorization, PalletRegistriesRegistryDetails, PalletRemarkCall, PalletRemarkError, PalletRemarkEvent, PalletRootTestingCall, PalletRootTestingEvent, PalletRuntimeUpgradeCall, PalletSchedulerCall, PalletSchedulerError, PalletSchedulerEvent, PalletSchedulerRetryConfig, PalletSchedulerScheduled, PalletSchemaCall, PalletSchemaError, PalletSchemaEvent, PalletSchemaSchemaEntry, PalletSessionCall, PalletSessionError, PalletSessionEvent, PalletStatementCall, PalletStatementError, PalletStatementEvent, PalletStatementPresentationTypeOf, PalletStatementStatementDetails, PalletStatementStatementEntryStatus, PalletStatementStatementPresentationDetails, PalletSudoCall, PalletSudoError, PalletSudoEvent, PalletTimestampCall, PalletTransactionPaymentChargeTransactionPayment, PalletTransactionPaymentEvent, PalletTransactionPaymentReleases, PalletTreasuryCall, PalletTreasuryError, PalletTreasuryEvent, PalletTreasuryPaymentState, PalletTreasuryProposal, PalletTreasurySpendStatus, PalletUtilityCall, PalletUtilityError, PalletUtilityEvent, SpArithmeticArithmeticError, SpAuthorityDiscoveryAppPublic, SpConsensusBabeAllowedSlots, SpConsensusBabeAppPublic, SpConsensusBabeBabeEpochConfiguration, SpConsensusBabeDigestsNextConfigDescriptor, SpConsensusBabeDigestsPreDigest, SpConsensusBabeDigestsPrimaryPreDigest, SpConsensusBabeDigestsSecondaryPlainPreDigest, SpConsensusBabeDigestsSecondaryVRFPreDigest, SpConsensusGrandpaAppPublic, SpConsensusGrandpaAppSignature, SpConsensusGrandpaEquivocation, SpConsensusGrandpaEquivocationProof, SpConsensusSlotsEquivocationProof, SpCoreCryptoKeyTypeId, SpCoreSr25519VrfVrfSignature, SpCoreVoid, SpRuntimeBlakeTwo256, SpRuntimeDigest, SpRuntimeDigestDigestItem, SpRuntimeDispatchError, SpRuntimeHeader, SpRuntimeModuleError, SpRuntimeMultiSignature, SpRuntimeTokenError, SpRuntimeTransactionalError, SpSessionMembershipProof, SpStakingOffenceOffenceDetails, SpVersionRuntimeVersion, SpWeightsRuntimeDbWeight, SpWeightsWeightV2Weight } from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  interface InterfaceTypes {
    AuthorityMembershipCall: AuthorityMembershipCall;
    AuthorityMembershipError: AuthorityMembershipError;
    AuthorityMembershipEvent: AuthorityMembershipEvent;
    CordIdentifierCallTypeOf: CordIdentifierCallTypeOf;
    CordIdentifierError: CordIdentifierError;
    CordIdentifierEventEntry: CordIdentifierEventEntry;
    CordIdentifierIdentifierTypeOf: CordIdentifierIdentifierTypeOf;
    CordIdentifierTimepoint: CordIdentifierTimepoint;
    CordLoomRuntimeMaxNewKeyAgreementKeys: CordLoomRuntimeMaxNewKeyAgreementKeys;
    CordLoomRuntimeOriginCaller: CordLoomRuntimeOriginCaller;
    CordLoomRuntimeRuntime: CordLoomRuntimeRuntime;
    CordLoomRuntimeRuntimeFreezeReason: CordLoomRuntimeRuntimeFreezeReason;
    CordLoomRuntimeRuntimeHoldReason: CordLoomRuntimeRuntimeHoldReason;
    CordLoomRuntimeSessionKeys: CordLoomRuntimeSessionKeys;
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FrameSupportDispatchDispatchClass: FrameSupportDispatchDispatchClass;
    FrameSupportDispatchDispatchInfo: FrameSupportDispatchDispatchInfo;
    FrameSupportDispatchPays: FrameSupportDispatchPays;
    FrameSupportDispatchPerDispatchClassU32: FrameSupportDispatchPerDispatchClassU32;
    FrameSupportDispatchPerDispatchClassWeight: FrameSupportDispatchPerDispatchClassWeight;
    FrameSupportDispatchPerDispatchClassWeightsPerClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportPalletId: FrameSupportPalletId;
    FrameSupportPreimagesBounded: FrameSupportPreimagesBounded;
    FrameSupportTokensFungibleUnionOfNativeOrWithId: FrameSupportTokensFungibleUnionOfNativeOrWithId;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSupportTokensMiscIdAmountRuntimeFreezeReason: FrameSupportTokensMiscIdAmountRuntimeFreezeReason;
    FrameSupportTokensMiscIdAmountRuntimeHoldReason: FrameSupportTokensMiscIdAmountRuntimeHoldReason;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemCodeUpgradeAuthorization: FrameSystemCodeUpgradeAuthorization;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonZeroSender: FrameSystemExtensionsCheckNonZeroSender;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    PalletAssetConversionCall: PalletAssetConversionCall;
    PalletAssetConversionError: PalletAssetConversionError;
    PalletAssetConversionEvent: PalletAssetConversionEvent;
    PalletAssetConversionPoolInfo: PalletAssetConversionPoolInfo;
    PalletAssetsAccountStatus: PalletAssetsAccountStatus;
    PalletAssetsApproval: PalletAssetsApproval;
    PalletAssetsAssetAccount: PalletAssetsAssetAccount;
    PalletAssetsAssetDetails: PalletAssetsAssetDetails;
    PalletAssetsAssetMetadata: PalletAssetsAssetMetadata;
    PalletAssetsAssetStatus: PalletAssetsAssetStatus;
    PalletAssetsCall: PalletAssetsCall;
    PalletAssetsError: PalletAssetsError;
    PalletAssetsEvent: PalletAssetsEvent;
    PalletAssetsExistenceReason: PalletAssetsExistenceReason;
    PalletBabeCall: PalletBabeCall;
    PalletBabeError: PalletBabeError;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesAdjustmentDirection: PalletBalancesAdjustmentDirection;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReserveData: PalletBalancesReserveData;
    PalletChainSpaceCall: PalletChainSpaceCall;
    PalletChainSpaceError: PalletChainSpaceError;
    PalletChainSpaceEvent: PalletChainSpaceEvent;
    PalletChainSpacePermissions: PalletChainSpacePermissions;
    PalletChainSpaceSpaceAuthorization: PalletChainSpaceSpaceAuthorization;
    PalletChainSpaceSpaceDetails: PalletChainSpaceSpaceDetails;
    PalletCollectiveCall: PalletCollectiveCall;
    PalletCollectiveError: PalletCollectiveError;
    PalletCollectiveEvent: PalletCollectiveEvent;
    PalletCollectiveRawOrigin: PalletCollectiveRawOrigin;
    PalletCollectiveVotes: PalletCollectiveVotes;
    PalletContractsCall: PalletContractsCall;
    PalletContractsEnvironment: PalletContractsEnvironment;
    PalletContractsEnvironmentTypeAccountId32: PalletContractsEnvironmentTypeAccountId32;
    PalletContractsEnvironmentTypeBlakeTwo256: PalletContractsEnvironmentTypeBlakeTwo256;
    PalletContractsEnvironmentTypeH256: PalletContractsEnvironmentTypeH256;
    PalletContractsEnvironmentTypeU128: PalletContractsEnvironmentTypeU128;
    PalletContractsEnvironmentTypeU32: PalletContractsEnvironmentTypeU32;
    PalletContractsEnvironmentTypeU64: PalletContractsEnvironmentTypeU64;
    PalletContractsError: PalletContractsError;
    PalletContractsEvent: PalletContractsEvent;
    PalletContractsHoldReason: PalletContractsHoldReason;
    PalletContractsOrigin: PalletContractsOrigin;
    PalletContractsSchedule: PalletContractsSchedule;
    PalletContractsScheduleInstructionWeights: PalletContractsScheduleInstructionWeights;
    PalletContractsScheduleLimits: PalletContractsScheduleLimits;
    PalletContractsStorageContractInfo: PalletContractsStorageContractInfo;
    PalletContractsStorageDeletionQueueManager: PalletContractsStorageDeletionQueueManager;
    PalletContractsWasmCodeInfo: PalletContractsWasmCodeInfo;
    PalletContractsWasmDeterminism: PalletContractsWasmDeterminism;
    PalletDidCall: PalletDidCall;
    PalletDidDidDetails: PalletDidDidDetails;
    PalletDidDidDetailsDidAuthorizedCallOperation: PalletDidDidDetailsDidAuthorizedCallOperation;
    PalletDidDidDetailsDidCreationDetails: PalletDidDidDetailsDidCreationDetails;
    PalletDidDidDetailsDidEncryptionKey: PalletDidDidDetailsDidEncryptionKey;
    PalletDidDidDetailsDidPublicKey: PalletDidDidDetailsDidPublicKey;
    PalletDidDidDetailsDidPublicKeyDetails: PalletDidDidDetailsDidPublicKeyDetails;
    PalletDidDidDetailsDidSignature: PalletDidDidDetailsDidSignature;
    PalletDidDidDetailsDidVerificationKey: PalletDidDidDetailsDidVerificationKey;
    PalletDidError: PalletDidError;
    PalletDidEvent: PalletDidEvent;
    PalletDidNameCall: PalletDidNameCall;
    PalletDidNameDidNameDidNameOwnership: PalletDidNameDidNameDidNameOwnership;
    PalletDidNameError: PalletDidNameError;
    PalletDidNameEvent: PalletDidNameEvent;
    PalletDidOriginDidRawOrigin: PalletDidOriginDidRawOrigin;
    PalletDidServiceEndpointsDidEndpoint: PalletDidServiceEndpointsDidEndpoint;
    PalletEntriesCall: PalletEntriesCall;
    PalletEntriesError: PalletEntriesError;
    PalletEntriesEvent: PalletEntriesEvent;
    PalletEntriesRegistryEntryDetails: PalletEntriesRegistryEntryDetails;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletIdentityAuthorityProperties: PalletIdentityAuthorityProperties;
    PalletIdentityCall: PalletIdentityCall;
    PalletIdentityError: PalletIdentityError;
    PalletIdentityEvent: PalletIdentityEvent;
    PalletIdentityJudgement: PalletIdentityJudgement;
    PalletIdentityLegacyIdentityInfo: PalletIdentityLegacyIdentityInfo;
    PalletIdentityRegistrarInfo: PalletIdentityRegistrarInfo;
    PalletIdentityRegistration: PalletIdentityRegistration;
    PalletImOnlineCall: PalletImOnlineCall;
    PalletImOnlineError: PalletImOnlineError;
    PalletImOnlineEvent: PalletImOnlineEvent;
    PalletImOnlineHeartbeat: PalletImOnlineHeartbeat;
    PalletImOnlineSr25519AppSr25519Public: PalletImOnlineSr25519AppSr25519Public;
    PalletImOnlineSr25519AppSr25519Signature: PalletImOnlineSr25519AppSr25519Signature;
    PalletIndicesCall: PalletIndicesCall;
    PalletIndicesError: PalletIndicesError;
    PalletIndicesEvent: PalletIndicesEvent;
    PalletMembershipCall: PalletMembershipCall;
    PalletMembershipError: PalletMembershipError;
    PalletMembershipEvent: PalletMembershipEvent;
    PalletMultisigCall: PalletMultisigCall;
    PalletMultisigError: PalletMultisigError;
    PalletMultisigEvent: PalletMultisigEvent;
    PalletMultisigMultisig: PalletMultisigMultisig;
    PalletMultisigTimepoint: PalletMultisigTimepoint;
    PalletNetworkMembershipCall: PalletNetworkMembershipCall;
    PalletNetworkMembershipCheckNetworkMembership: PalletNetworkMembershipCheckNetworkMembership;
    PalletNetworkMembershipError: PalletNetworkMembershipError;
    PalletNetworkMembershipEvent: PalletNetworkMembershipEvent;
    PalletNetworkMembershipMemberData: PalletNetworkMembershipMemberData;
    PalletNetworkScoreAggregatedEntryOf: PalletNetworkScoreAggregatedEntryOf;
    PalletNetworkScoreCall: PalletNetworkScoreCall;
    PalletNetworkScoreEntryTypeOf: PalletNetworkScoreEntryTypeOf;
    PalletNetworkScoreError: PalletNetworkScoreError;
    PalletNetworkScoreEvent: PalletNetworkScoreEvent;
    PalletNetworkScoreRatingEntry: PalletNetworkScoreRatingEntry;
    PalletNetworkScoreRatingInputEntry: PalletNetworkScoreRatingInputEntry;
    PalletNetworkScoreRatingTypeOf: PalletNetworkScoreRatingTypeOf;
    PalletNodeAuthorizationCall: PalletNodeAuthorizationCall;
    PalletNodeAuthorizationError: PalletNodeAuthorizationError;
    PalletNodeAuthorizationEvent: PalletNodeAuthorizationEvent;
    PalletNodeAuthorizationNodeInfo: PalletNodeAuthorizationNodeInfo;
    PalletOffencesEvent: PalletOffencesEvent;
    PalletPreimageCall: PalletPreimageCall;
    PalletPreimageError: PalletPreimageError;
    PalletPreimageEvent: PalletPreimageEvent;
    PalletPreimageHoldReason: PalletPreimageHoldReason;
    PalletPreimageOldRequestStatus: PalletPreimageOldRequestStatus;
    PalletPreimageRequestStatus: PalletPreimageRequestStatus;
    PalletRegistriesCall: PalletRegistriesCall;
    PalletRegistriesError: PalletRegistriesError;
    PalletRegistriesEvent: PalletRegistriesEvent;
    PalletRegistriesPermissions: PalletRegistriesPermissions;
    PalletRegistriesRegistryAuthorization: PalletRegistriesRegistryAuthorization;
    PalletRegistriesRegistryDetails: PalletRegistriesRegistryDetails;
    PalletRemarkCall: PalletRemarkCall;
    PalletRemarkError: PalletRemarkError;
    PalletRemarkEvent: PalletRemarkEvent;
    PalletRootTestingCall: PalletRootTestingCall;
    PalletRootTestingEvent: PalletRootTestingEvent;
    PalletRuntimeUpgradeCall: PalletRuntimeUpgradeCall;
    PalletSchedulerCall: PalletSchedulerCall;
    PalletSchedulerError: PalletSchedulerError;
    PalletSchedulerEvent: PalletSchedulerEvent;
    PalletSchedulerRetryConfig: PalletSchedulerRetryConfig;
    PalletSchedulerScheduled: PalletSchedulerScheduled;
    PalletSchemaCall: PalletSchemaCall;
    PalletSchemaError: PalletSchemaError;
    PalletSchemaEvent: PalletSchemaEvent;
    PalletSchemaSchemaEntry: PalletSchemaSchemaEntry;
    PalletSessionCall: PalletSessionCall;
    PalletSessionError: PalletSessionError;
    PalletSessionEvent: PalletSessionEvent;
    PalletStatementCall: PalletStatementCall;
    PalletStatementError: PalletStatementError;
    PalletStatementEvent: PalletStatementEvent;
    PalletStatementPresentationTypeOf: PalletStatementPresentationTypeOf;
    PalletStatementStatementDetails: PalletStatementStatementDetails;
    PalletStatementStatementEntryStatus: PalletStatementStatementEntryStatus;
    PalletStatementStatementPresentationDetails: PalletStatementStatementPresentationDetails;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoEvent: PalletSudoEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentEvent: PalletTransactionPaymentEvent;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    PalletTreasuryCall: PalletTreasuryCall;
    PalletTreasuryError: PalletTreasuryError;
    PalletTreasuryEvent: PalletTreasuryEvent;
    PalletTreasuryPaymentState: PalletTreasuryPaymentState;
    PalletTreasuryProposal: PalletTreasuryProposal;
    PalletTreasurySpendStatus: PalletTreasurySpendStatus;
    PalletUtilityCall: PalletUtilityCall;
    PalletUtilityError: PalletUtilityError;
    PalletUtilityEvent: PalletUtilityEvent;
    SpArithmeticArithmeticError: SpArithmeticArithmeticError;
    SpAuthorityDiscoveryAppPublic: SpAuthorityDiscoveryAppPublic;
    SpConsensusBabeAllowedSlots: SpConsensusBabeAllowedSlots;
    SpConsensusBabeAppPublic: SpConsensusBabeAppPublic;
    SpConsensusBabeBabeEpochConfiguration: SpConsensusBabeBabeEpochConfiguration;
    SpConsensusBabeDigestsNextConfigDescriptor: SpConsensusBabeDigestsNextConfigDescriptor;
    SpConsensusBabeDigestsPreDigest: SpConsensusBabeDigestsPreDigest;
    SpConsensusBabeDigestsPrimaryPreDigest: SpConsensusBabeDigestsPrimaryPreDigest;
    SpConsensusBabeDigestsSecondaryPlainPreDigest: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    SpConsensusBabeDigestsSecondaryVRFPreDigest: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    SpConsensusGrandpaAppPublic: SpConsensusGrandpaAppPublic;
    SpConsensusGrandpaAppSignature: SpConsensusGrandpaAppSignature;
    SpConsensusGrandpaEquivocation: SpConsensusGrandpaEquivocation;
    SpConsensusGrandpaEquivocationProof: SpConsensusGrandpaEquivocationProof;
    SpConsensusSlotsEquivocationProof: SpConsensusSlotsEquivocationProof;
    SpCoreCryptoKeyTypeId: SpCoreCryptoKeyTypeId;
    SpCoreSr25519VrfVrfSignature: SpCoreSr25519VrfVrfSignature;
    SpCoreVoid: SpCoreVoid;
    SpRuntimeBlakeTwo256: SpRuntimeBlakeTwo256;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeHeader: SpRuntimeHeader;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpSessionMembershipProof: SpSessionMembershipProof;
    SpStakingOffenceOffenceDetails: SpStakingOffenceOffenceDetails;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    SpWeightsRuntimeDbWeight: SpWeightsRuntimeDbWeight;
    SpWeightsWeightV2Weight: SpWeightsWeightV2Weight;
  } // InterfaceTypes
} // declare module
