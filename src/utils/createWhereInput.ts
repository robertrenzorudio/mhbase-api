import { EntityName } from '../enums';
import { ItemSearchType } from '../enums/ItemSearchType';

export const createWhereInput = (
  entityName: EntityName,
  query: string,
  searchType?: any
) => {
  switch (entityName) {
    case EntityName.Item:
      return createItemWhereInput(query, searchType);

    default:
      return undefined;
  }
};

export const createItemWhereInput = (
  query: string,
  searchType?: ItemSearchType
): any => {
  let where;
  switch (searchType) {
    case ItemSearchType.Id:
      where = { id: parseInt(query) };
      break;

    case ItemSearchType.Name:
      where = { name: { contains: query } };
      break;

    case ItemSearchType.Description:
      where = { description: { contains: query } };
      break;

    case ItemSearchType.Rarity:
      where = { rarity: parseInt(query) };
      break;

    case ItemSearchType.CarryLimit:
      where = { carryLimit: parseInt(query) };
      break;

    case ItemSearchType.Value:
      where = { value: parseInt(query) };
      break;

    default:
      where = undefined;
      break;
  }

  return where;
};
