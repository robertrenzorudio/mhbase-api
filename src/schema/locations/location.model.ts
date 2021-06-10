import 'reflect-metadata';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Camp } from './camp.model';

@ObjectType()
export class Location {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;

  @Field(() => Int)
  zoneCount: number;

  @Field(() => [Camp])
  camps: Camp[];
}
