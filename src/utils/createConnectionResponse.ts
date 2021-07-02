import { BaseType } from '../schema/shared/BaseType';
import { cursorHash } from '.';
import { Context } from '../types';
import { EntityName } from 'src/enums';

/**
 * @param data  The data returned by database.
 * @param first The query field "first" of the request.
 * @param last  The query field "last" of the request.
 * @returns
 */

const emptyResponse = {
  totalCount: 0,
  edges: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: null,
    startCursor: null,
  },
};

interface createConnectionArgs<T extends BaseType> {
  ctx: Context;
  data: T[];
  entity: EntityName;
  first?: number;
  last?: number;
  before?: string;
  after?: string;
}
export const createConnectionResponse = async <T extends BaseType>(
  args: createConnectionArgs<T>
) => {
  const { data, first, last } = args;
  if (data.length === 0) {
    return emptyResponse;
  }

  const hasNextPage = await _hasNextPage(args);
  const hasPreviousPage = await _hasPreviousPage(args);

  let nodes = [...data];
  if (first && data.length > first) {
    nodes.pop();
  } else if (last && data.length > last) {
    nodes.shift();
  }

  if (nodes.length === 0) {
    return emptyResponse;
  }

  const edges = nodes.map((edge) => {
    return {
      cursor: cursorHash.cursorToHash(edge.id),
      node: edge,
    };
  });

  return {
    totalCount: edges.length,
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges[0].cursor,
      endCursor: edges.slice(-1)[0].cursor,
    },
  };
};

const _hasNextPage = async <T extends BaseType>(
  args: createConnectionArgs<T>
) => {
  const { ctx, data, entity, first, before } = args;
  const key = `${entity}-MaxId`;

  if (before) {
    const maxId = await ctx.redis.get(key);
    if (!maxId) {
      const [{ max }] = await ctx.prisma.$queryRaw<[{ max: number }]>(
        `SELECT MAX("id") FROM "${entity}" LIMIT 1`
      );
      await ctx.redis.setex(key, 3600, max);
      return max !== data.slice(-1)[0].id;
    } else {
      return +maxId !== data.slice(-1)[0].id;
    }
  } else if (first) {
    return data.length > first;
  }

  return false;
};

const _hasPreviousPage = async <T extends BaseType>(
  args: createConnectionArgs<T>
) => {
  const { ctx, data, entity, last, after } = args;
  const key = `${entity}-MinId`;

  if (after) {
    const minId = await ctx.redis.get(key);
    if (!minId) {
      const [{ min }] = await ctx.prisma.$queryRaw<[{ min: number }]>(
        `SELECT MIN("id") FROM "${entity}" LIMIT 1`
      );
      await ctx.redis.setex(key, 3600, min);
      return min !== data[0].id;
    } else {
      return +minId !== data[0].id;
    }
  } else if (last) {
    return data.length > last;
  }

  return false;
};
