import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { resolvers as resolversArr } from './resolvers';

const buildSchema = async (): Promise<GraphQLSchema> => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: resolversArr,
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  return schema;
};

export default buildSchema;
