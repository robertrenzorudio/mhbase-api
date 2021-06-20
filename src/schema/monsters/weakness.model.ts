import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Weakness {
  @Field(() => Int)
  stars: number;

  @Field()
  element: string;

  @Field({ nullable: true })
  condition: string;
}
