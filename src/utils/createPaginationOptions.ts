export const createPaginationOptions = (options: {
  take: number;
  skip?: number;
  before?: number;
  after?: number;
}) => {
  let { take, skip, before, after } = options;
  // Set skip to 1 if before or after is defined.
  skip = before || after ? 1 : skip;

  // If both after and before is defined, set id to after.
  let id = undefined;
  if (after) {
    id = after;
  } else if (before) {
    id = before;
    take = take * -1;
  }

  const cursor = id ? { id } : undefined;
  const paginationOpt = { take, skip, cursor };

  return paginationOpt;
};
