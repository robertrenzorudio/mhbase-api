import { MiddlewareFn } from 'type-graphql';

export const ValidatePaginationArgs: MiddlewareFn = async ({ args }, next) => {
  const { before, after, first, last } = args;
  if (before && after) {
    throw {
      message: 'providing both "before" and "after" is not supported',
      code: '400',
    };
  }

  if (first && last) {
    throw {
      message: 'providing both "first" and "last" is not supported',
      code: '400',
    };
  }

  if (!first && !last) {
    throw {
      message: 'you must provide one of "first" or "last"',
      code: '400',
    };
  }
  return next();
};
