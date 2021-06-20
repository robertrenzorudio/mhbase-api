import { Field, ObjectType } from 'type-graphql';
import { Item } from '../items/item.model';
import { Condition } from './condition.model';

@ObjectType()
export class Reward {
  readonly id: number;

  @Field()
  item: Item;

  @Field(() => [Condition])
  conditions: [Condition];
}
