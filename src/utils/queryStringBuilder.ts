import { EntityName } from '../enums';

export interface findManyArgs {
  entity: EntityName;
  limit: number;
  before?: number;
  after?: number;
  name?: string;
}

const findMany = (args: findManyArgs) => {
  const { entity, limit, before, after, name } = args;
  // Build the query string.
  let baseStmt: string = `SELECT * FROM "${entity}" `;
  let orderStmt = `ORDER BY "${entity}"."id" ASC `;
  let whereStmt = '';
  let limitStmt = '';
  let values = [];
  let valueNumber = 1;

  // Build WHERE statement
  if (after) {
    whereStmt = `WHERE "${entity}"."id" > \$${valueNumber++} `;
    values.push(after);
  } else if (before) {
    whereStmt = `WHERE "${entity}"."id" < \$${valueNumber++} `;
    orderStmt = `ORDER BY "${entity}"."id" DESC `;
    values.push(before);
  }

  if (name) {
    whereStmt = whereStmt
      ? (whereStmt += `AND "${entity}"."name" LIKE \$${valueNumber++} `)
      : `WHERE "${entity}"."name" LIKE \$${valueNumber++} `;
    values.push(`%${name}%`);
  }

  // Build LIMIT statement.
  limitStmt = `LIMIT \$${valueNumber++} `;
  values.push(limit);

  // Concatenate statements.
  let queryString = baseStmt + whereStmt + orderStmt + limitStmt;
  if (!after && before) {
    queryString =
      `WITH "q0" AS (${queryString}) ` +
      `SELECT * FROM "q0" ORDER BY "q0"."id" ASC`;
  }

  return { query: queryString, values: values };
};

const findOne = (entity: EntityName, id?: number, name?: string) => {
  let queryString;
  if (id) {
    queryString = `SELECT * FROM "${entity}" WHERE "${entity}"."id" = $1`;
  } else {
    queryString = `SELECT * FROM "${entity}" WHERE "${entity}"."name" LIKE $1`;
  }

  const value = id ? id : `%${name}%`;
  return { query: queryString, value };
};

export { findOne, findMany };
