import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../server/schema/schema.graphql',
  documents: ['src/graphql/**/*.ts'],
  generates: {
    'src/gql/': {
      preset: 'client',
    },
  },
}

export default config
