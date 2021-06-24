import { MiddlewareFn } from 'type-graphql';
import { ApolloError } from 'apollo-server-core';

export const ErrorInterceptor: MiddlewareFn = async (_, next) => {
  try {
    return await next();
  } catch (err) {
    if ((err.message = 'Argument Validation Error')) {
      throw err;
    }

    let message;
    let code;
    if (err.code && err.code.match(/^[P][0-9]{4}$/)) {
      message =
        'Internal server error. Please try again later when we fixed the problem';
      code = '500';
    } else {
      message = err.message;
      code = err.code;
    }

    throw new ApolloError(message, code, err.extensions);
  }
};
