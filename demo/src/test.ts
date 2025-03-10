import { ApiPromise, WsProvider } from '@polkadot/api';

async function main() {
    // Connect to the node
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });

    console.log('Connected to the blockchain. Watching for events...');

    // Subscribe to system events
    api.query.system.events((events) => {
        events.forEach(({ event }) => {
            const { section, method, data } = event;
            console.log(`\nEvent: ${section}.${method}`);

            // Replace 'YourPallet' and 'YourEvent' with actual pallet and event names
            if (section === 'chainSpaceDid' && method === 'Create') {
                console.log(`Detected event: ${section}.${method}`);
                console.log(`Emitted Identifier:`, data.toHuman());
            }
        });
    });
}

main().catch(console.error);
