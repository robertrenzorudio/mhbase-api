import { MiddlewareFn } from 'type-graphql';
import { ApolloError } from 'apollo-server-core';

export const ErrorInterceptor: MiddlewareFn = async (_, next) => {
  try {
    return await next();
  } catch (err) {
    const message: string =
      err.message || 'An Error Has Occured. Please try again later';
    throw new ApolloError(message, err.code, err.extensions);
  }
};
