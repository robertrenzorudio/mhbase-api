import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';

const getSchema = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers,
  });

  return schema;
};

export default getSchema;
