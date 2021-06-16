require('dotenv').config();
import { gql, GraphQLClient } from 'graphql-request';
import { PrismaClient } from '@prisma/client';
import { Location, Camp } from '@prisma/client';

const prisma = new PrismaClient();
const client = new GraphQLClient('http://localhost:4000/graphql', {
  headers: {},
});

const convertIds = (
  arr: (Location & {
    camps: Camp[];
  })[]
) => {
  const convert = arr.map(({ id, name, zoneCount, camps }) => {
    return {
      id: id.toString(),
      name,
      zoneCount,
      camps: camps.map(({ id, name, zone, locationId }) => {
        return {
          id: id.toString(),
          name,
          zone,
          locationId: locationId.toString(),
        };
      }),
    };
  });

  return convert;
};

afterAll(() => {
  return prisma.$disconnect();
});

test('Query.locations', async () => {
  const limit = 3;
  const before = 7;
  const after = 7;

  const query = gql`
    {
      locations(limit: ${limit}, after: ${after}, before: ${before}) {
        id
        name
        zoneCount
        camps {
          id
          name
          zone
          locationId
        }
      }
    }
  `;
  const data = await client.request(query);

  const dbRes = await prisma.location.findMany({
    take: limit,
    skip: 1,
    cursor: { id: after },
    include: { camps: true },
  });

  const expected = convertIds(dbRes);

  expect(data.locations).toEqual(expected);
});

test('Query.location', async () => {
  const args = ['Everstream', -1, 7, 'rns of El D', 10, '**NOTEXIST**'];
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
        location(${queryArgs}) {
          id
          name
          zoneCount
          camps {
            id
            name
            zone
            locationId
          }
        }
      }
    `;

    const apiRes = await client.request(query);
    apiData.push(apiRes.location);

    let dbRes;
    if (types[i] === 'number') {
      dbRes = await prisma.location.findFirst({
        where: { id: args[i] as number },
        include: { camps: true },
      });
    } else {
      dbRes = await prisma.location.findFirst({
        where: { name: { contains: args[i] as string } },
        include: { camps: true },
      });
    }

    if (dbRes) {
      dbRes = convertIds([dbRes]);
      dbRes = dbRes[0];
    }
    dbData.push(dbRes);
  }

  expect(apiData).toEqual(dbData);
});
