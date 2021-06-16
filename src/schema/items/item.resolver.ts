import 'reflect-metadata';
import { Resolver } from 'type-graphql';
import { ItemArgs } from './item.args';
import { Item } from './item.model';
import { createBaseResolver } from '../baseResolver';
import { EntityName } from '../../enums';

const itemBaseResolver = createBaseResolver(
  'item',
  Item,
  ItemArgs,
  EntityName.Item
);

@Resolver(Item)
export class ItemResolver extends itemBaseResolver {}
