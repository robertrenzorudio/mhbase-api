import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Item {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;

  @Field(() => Int)
  rarity: number;

  @Field(() => Int)
  carryLimit: number;

  @Field(() => Int)
  value: number;
}
