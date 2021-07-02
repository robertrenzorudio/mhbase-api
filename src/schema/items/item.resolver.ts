import 'reflect-metadata';
import { Resolver } from 'type-graphql';
import { ItemArgs } from './item.args';
import { Item, ItemConnection } from './item.type';
import { createBaseResolver } from '../shared';
import { EntityName } from '../../enums';

const ItemBaseResolver = createBaseResolver(
  'item',
  Item,
  ItemConnection,
  ItemArgs,
  EntityName.Item
);

@Resolver(ItemConnection)
export class ItemResolver extends ItemBaseResolver {}
