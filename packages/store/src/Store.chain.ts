import {
    DidUri,
    AuthorizationUri,
    SignExtrinsicCallback,
    AuthorizationId,
    CordKeyringPair,
} from '@cord.network/types'

import * as Did from '@cord.network/did'

import { Chain } from '@cord.network/network'

import { SDKErrors } from '@cord.network/utils'

import { ConfigService } from '@cord.network/config'

import { uriToIdentifier } from '@cord.network/identifier'
import { 
    StoreUri
} from '@cord.network/types/src/store';

export async function dispatchAddToChain(
    creator: DidUri,
    storeUri: StoreUri,
    digest: string,
    raw_data: string,
    authorizationUri: AuthorizationUri,
    authorAccount: CordKeyringPair,
    signCallback: SignExtrinsicCallback,
): Promise<{ storeUri: StoreUri, creator: DidUri }> {
    try {
        const api = ConfigService.get('api')
        const authorizationId: AuthorizationId = uriToIdentifier(authorizationUri)
        
        const tx = api.tx.store.add(
            storeUri,
            digest,
            raw_data,
            authorizationId
        )

        const extrinsic = await Did.authorizeTx(
            creator,
            tx,
            signCallback,
            authorAccount.address
        )
        
        await Chain.signAndSubmitTx(extrinsic, authorAccount)

        return { storeUri, creator }
    } catch (error) {
        const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error)
        throw new SDKErrors.CordDispatchError(
        `Error dispatching to chain: "${errorMessage}".`
        )
    }
    
}

export async function dispatchUpdateToChain(
    creator: DidUri,
    storeUri: StoreUri,
    digest: string,
    authorizationUri: AuthorizationUri,
    authorAccount: CordKeyringPair,
    signCallback: SignExtrinsicCallback,
): Promise<{ storeUri: StoreUri, creator: DidUri }> {
    try {
        const api = ConfigService.get('api')
        const authorizationId: AuthorizationId = uriToIdentifier(authorizationUri)
        
        const tx = api.tx.store.update(
            storeUri,
            digest,
            authorizationId
        )

        const extrinsic = await Did.authorizeTx(
            creator,
            tx,
            signCallback,
            authorAccount.address
        )
        
        await Chain.signAndSubmitTx(extrinsic, authorAccount)

        return { storeUri, creator }
    } catch (error) {
        const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error)
        throw new SDKErrors.CordDispatchError(
        `Error dispatching to chain: "${errorMessage}".`
        )
    }
    
}

export async function dispatchRedactToChain(
    creator: DidUri,
    storeUri: StoreUri,
    authorAccount: CordKeyringPair,
    signCallback: SignExtrinsicCallback,
): Promise<{ storeUri: StoreUri, creator: DidUri }> {
    try {
        const api = ConfigService.get('api')

        const tx = api.tx.store.redact(
            storeUri
        )

        const extrinsic = await Did.authorizeTx(
            creator,
            tx,
            signCallback,
            authorAccount.address
        )
        
        await Chain.signAndSubmitTx(extrinsic, authorAccount)

        return { storeUri, creator }
    } catch (error) {
        const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error)
        throw new SDKErrors.CordDispatchError(
        `Error dispatching to chain: "${errorMessage}".`
        )
    }
    
}
