import 'reflect-metadata';
import { Resolver } from 'type-graphql';
import { ItemArgs } from './item.args';
import { ItemInfo } from './item.model';
import { createBaseResolver } from '../shared';
import { EntityName } from '../../enums';

const ItemBaseResolver = createBaseResolver(
  'item',
  ItemInfo,
  ItemArgs,
  EntityName.Item
);

@Resolver(ItemInfo)
export class ItemResolver extends ItemBaseResolver {}
