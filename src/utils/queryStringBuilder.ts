import { EntityName } from '../enums';

export interface findManyArgs {
  entity: EntityName;
  before?: number;
  after?: number;
  first?: number;
  last?: number;
}

const findMany = (args: findManyArgs) => {
  const { entity, before, after, first, last } = args;

  // Build the query string.
  let valueNumber = 1;
  let values = [];

  let selectStmt: string = `SELECT * FROM "${entity}" `;

  // Build the WHERE statement.
  let whereStmt = '';
  if (before || after) {
    whereStmt = `WHERE "${entity}"."id" ${
      after ? '>' : '<'
    } \$${valueNumber++} `;
    values.push(after || before);
  }

  // Build the ORDER statement.
  let orderStmt = `ORDER BY "${entity}"."id" ${last ? 'DESC' : 'ASC'} `;

  // Build LIMIT statement.
  let limitStmt = `LIMIT \$${valueNumber++} `;
  values.push(first || last);

  // Concatenate statements.
  let queryString = selectStmt + whereStmt + orderStmt + limitStmt;
  if (last) {
    queryString =
      `WITH "q0" AS (${queryString}) ` +
      `SELECT * FROM "q0" ORDER BY "q0"."id" ASC`;
  }

  return { query: queryString, values: values };
};

const findOne = (entity: EntityName, id?: number | string, name?: string) => {
  let queryString;
  if (id && typeof id === 'string') {
    id = parseInt(id);
  }
  if (id) {
    queryString = `SELECT * FROM "${entity}" WHERE "${entity}"."id" = $1`;
  } else {
    queryString = `SELECT * FROM "${entity}" WHERE "${entity}"."name" LIKE $1`;
  }

  const value = id ? id : `%${name}%`;
  return { query: queryString, value };
};

export { findOne, findMany };
