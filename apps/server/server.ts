import { createServer } from 'http'
import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'
import { seedBoard } from './store';

const schema = createSchema({
  typeDefs,
  resolvers,
});

seedBoard();

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
});

createServer(yoga).listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
});