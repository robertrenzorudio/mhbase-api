import { Field, Int, ObjectType } from 'type-graphql';
import { BaseType } from '../shared/BaseType';
import { BaseConnection } from '../shared/pageResponse.type';

@ObjectType({ implements: BaseType })
export class Item extends BaseType {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  rarity: number;

  @Field(() => Int)
  carryLimit: number;

  @Field(() => Int)
  value: number;
}

@ObjectType()
export class ItemConnection extends BaseConnection<Item>(Item) {}
