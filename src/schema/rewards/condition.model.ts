import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Condition {
  @Field()
  type: string;

  @Field({ nullable: true })
  subtype: string;

  @Field()
  rank: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  chance: number;
}
