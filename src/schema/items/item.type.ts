import { Field, Int, ObjectType } from 'type-graphql';
import { BaseModel } from '../shared/baseModel';
import { BaseConnection } from '../shared/pageResponse.model';

@ObjectType({ implements: BaseModel })
export class Item extends BaseModel {
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
