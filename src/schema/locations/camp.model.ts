import 'reflect-metadata';
import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Camp {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;

  @Field(() => Int)
  zone: number;

  @Field(() => ID)
  locationId: number;
}
