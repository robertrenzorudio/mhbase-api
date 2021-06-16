require('dotenv').config();
import { gql, GraphQLClient } from 'graphql-request';
import { PrismaClient } from '@prisma/client';
import { Item } from '@prisma/client';

const prisma = new PrismaClient();
const client = new GraphQLClient('http://localhost:4000/graphql', {
  headers: {},
});

const convertIds = (arr: Item[]) => {
  const convert = arr.map(
    ({ id, name, description, rarity, carryLimit, value }) => {
      return {
        id: id.toString(),
        name,
        description,
        rarity,
        carryLimit,
        value,
      };
    }
  );

  return convert;
};

afterAll(() => {
  return prisma.$disconnect();
});

test('Query.items', async () => {
  const limit = 2;
  const before = 1153;
  const after = 736;
  const name = 'jang';

  const query = gql`
    {
      items(limit: ${limit}, before: ${before}, after: ${after}, name: "${name}") {
        id
        name
        description
        rarity
        carryLimit
        value
      }
    }
  `;
  const data = await client.request(query);

  const dbRes = await prisma.item.findMany({
    take: limit,
    skip: 1,
    cursor: { id: after },
    where: { name: { contains: name } },
  });

  const expected = convertIds(dbRes);

  expect(data.items).toEqual(expected);
});

test('Query.item', async () => {
  const args = ['jang', 670, 'sin Cutw', 10, 54, -32];
  const types = args.map((arg) => typeof arg);

  let apiData = [];
  let dbData = [];
  for (let i = 0; i < args.length; i++) {
    let queryArgs;
    if (types[i] === 'number') {
      queryArgs = `id: ${args[i]}`;
    } else {
      queryArgs = `name: "${args[i]}"`;
    }

    const query = gql`
      {
        item(${queryArgs}) {
          id
          name
          description
          rarity
          carryLimit
          value
        }
      }
    `;

    const apiRes = await client.request(query);
    apiData.push(apiRes.item);

    let dbRes;
    if (types[i] === 'number') {
      dbRes = await prisma.item.findFirst({
        where: { id: args[i] as number },
      });
    } else {
      dbRes = await prisma.item.findFirst({
        where: { name: { contains: args[i] as string } },
      });
    }

    dbRes = dbRes
      ? {
          id: dbRes.id.toString(),
          name: dbRes.name,
          description: dbRes.description,
          rarity: dbRes.rarity,
          carryLimit: dbRes.carryLimit,
          value: dbRes.value,
        }
      : null;
    dbData.push(dbRes);
  }

  expect(apiData).toEqual(dbData);
});
