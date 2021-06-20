import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Resistance {
  @Field()
  element: string;

  @Field({ nullable: true })
  condition: string;
}
