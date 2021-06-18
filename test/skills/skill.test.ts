require('dotenv').config();
import { gql, GraphQLClient } from 'graphql-request';
import { PrismaClient } from '@prisma/client';
import { Skill, SkillRank } from '@prisma/client';

const prisma = new PrismaClient();
const client = new GraphQLClient('http://localhost:4000/graphql', {
  headers: {},
});

const convertIds = (
  arr: (Skill & {
    ranks: SkillRank[];
  })[]
) => {
  const convert = arr.map(({ id, name, description, ranks }) => {
    return {
      id: id.toString(),
      name,
      description,
      ranks: ranks.map(({ id, level, modifiers, skillName, skillId }) => {
        return {
          id: id.toString(),
          level,
          modifiers,
          skillName,
          skillId: skillId.toString(),
        };
      }),
    };
  });

  return convert;
};

afterAll(() => {
  return prisma.$disconnect();
});

test('Query.skills', async () => {
  const limit = 3;
  const before = 7;
  const after = 7;

  const query = gql`
    {
      skills(limit: ${limit}, after: ${after}, before: ${before}) {
        id
        name
        description
        ranks {
          id
          level
          modifiers
          skillName
          skillId
        }
      }
    }
  `;
  const data = await client.request(query);

  const dbRes = await prisma.skill.findMany({
    take: limit,
    skip: 1,
    cursor: { id: after },
    include: { ranks: true },
  });

  const expected = convertIds(dbRes);

  expect(data.skills).toEqual(expected);
});

test('Query.skill', async () => {
  const args = ['Fortify', -1, 54, 'lth Boo', 10, '**NOTEXIST**'];
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
        skill(${queryArgs}) {
          id
          name
          description
          ranks {
            id
            level
            modifiers
            skillName
            skillId
          }
        }
      }
    `;

    const apiRes = await client.request(query);
    apiData.push(apiRes.skill);

    let dbRes;
    if (types[i] === 'number') {
      dbRes = await prisma.skill.findFirst({
        where: { id: args[i] as number },
        include: { ranks: true },
      });
    } else {
      dbRes = await prisma.skill.findFirst({
        where: { name: { contains: args[i] as string } },
        include: { ranks: true },
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
