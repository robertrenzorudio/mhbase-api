import { registerEnumType } from 'type-graphql';

export enum ItemSearchType {
  Id = 'Id',
  Name = 'Name',
  Description = 'Description',
  Rarity = 'Rarity',
  CarryLimit = 'CarryLimit',
  Value = 'Value',
}

registerEnumType(ItemSearchType, {
  name: 'ItemSearchType',
  description: 'The attribute to be searched.',
  valuesConfig: {
    Id: { description: 'Returns item with matching Id.' },
    Name: { description: 'Returns item(s) containing the name.' },
    Description: { description: 'Returns item(s) containing the description.' },
    Rarity: { description: 'Returns item(s) with matching rarity.' },
    CarryLimit: { description: 'Returns item(s) with matching carry limit.' },
    Value: { description: 'Returns item(s) with matching value.' },
  },
});
