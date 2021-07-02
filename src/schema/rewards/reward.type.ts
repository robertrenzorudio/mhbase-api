import { Field, ObjectType } from 'type-graphql';
import { Item } from '../items/item.type';
import { Condition } from './condition.type';

@ObjectType()
export class Reward {
  readonly id: number;

  @Field()
  item: Item;

  @Field(() => [Condition])
  conditions: [Condition];
}
