import { EntityName } from '../enums';

export interface queryStringBuilderArgs {
  entity: EntityName;
  take: number;
  skip?: number;
  before?: number;
  after?: number;
  query?: string;
  searchType?: any;
}

export const queryStringBuilder = (args: queryStringBuilderArgs) => {
  const { entity, take, skip, before, after, query, searchType } = args;
  // Build the query string.
  let base: string = `SELECT * FROM "${entity}" `;
  let order = `ORDER BY "${entity}"."id" ASC `;
  let where = '';
  let limit = '';
  let offset = '';

  // Build WHERE statement
  if (after) {
    where = `WHERE "${entity}"."id" >= ${after} `;
  } else if (before) {
    where = `WHERE "${entity}"."id" <= ${before} `;
    order = `ORDER BY "${entity}"."id" DESC `;
  }

  if (query) {
    const row = searchType ? searchType.toLowerCase() : 'name';

    where = where
      ? (where += `AND "${entity}"."${row}" LIKE '%${query}%' `)
      : `WHERE "${entity}"."${row}" LIKE '%${query}%' `;
  }

  // Build LIMIT statement.
  limit = `LIMIT ${take} `;

  // Build OFFSET statement.
  offset = skip ? `OFFSET ${skip} ` : offset;

  // Concatenate statements.
  let queryString = base + where + order + limit + offset;
  if (!after && before) {
    queryString =
      `WITH "q0" AS (${queryString}) ` +
      `SELECT * FROM "q0" ORDER BY "q0"."id" ASC`;
  }

  return queryString;
};
