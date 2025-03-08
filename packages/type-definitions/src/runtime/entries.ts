import type { DefinitionsCall, DefinitionCall } from '@polkadot/types/types';

const EntriesApiCalls: Record<string, DefinitionCall> = {
//   retrieve_all_identifiers: {
//     description: 'Retrieves all the identifiers of Registry Entries.',
//     params: [], 
//     type: 'Vec<Bytes>', 
//   },
  identifier_exists: {
    description: 'Verifies if the identifier exists or not of any type.',
    params: [
      {
        name: 'identifier',
        type: 'Bytes',
      },
    ],
    type: 'bool', 
  },
  identifier_exists_by_type: {
    description: 'Verifies if the identifier exists or not for a specific type.',
    params: [
      {
        name: 'identifier',
        type: 'Bytes',
      },
    ],
    type: 'bool', 
  },
};

export const calls: DefinitionsCall = {
  EntriesApi: [
    {
      methods: {
        ...EntriesApiCalls,
      },
      version: 1,
    },
  ],
};
