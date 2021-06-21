import 'reflect-metadata';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Camp {
  readonly id: number;

  @Field()
  name: string;

  @Field(() => Int)
  zone: number;

  locationId: number;
}
