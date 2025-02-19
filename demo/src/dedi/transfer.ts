import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import * as Cord from '@cord.network/sdk'
import BN from 'bn.js'
import { createAccount } from '../utils/createAccount';

async function main() {
    const api = await Cord.connect('wss://registries.demo.cord.network');

    const keyring = new Keyring({ type: 'sr25519' });
    const receiver = keyring.addFromUri('//hdfc');
    console.log(`Receiver Address: ${receiver.address}`);

    const authorityAuthorIdentity = Cord.Utils.Crypto.makeKeypairFromUri(
      '0x47738cb5518e81ddec01e95bd41cf98a0631667c3d9cac4af3586d270e25d738//1',
      'sr25519'
    )
    console.log("Sender address", authorityAuthorIdentity.address);

    let hash;
    try {      
      let tx = await api.tx.balances.transferAllowDeath(receiver.address, new BN('900000000000000000000'));

      hash = await Cord.Chain.signAndSubmitTx(tx, authorityAuthorIdentity);
      console.log("Balance transferred successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error in main function: ${error.message}`);
      }
    }
    console.log(`Transaction sent! Hash: ${hash.toHex()}`);
    await api.disconnect();
}

main().catch(console.error);
