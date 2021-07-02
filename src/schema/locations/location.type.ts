import 'reflect-metadata';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Camp } from './camp.model';

@ObjectType()
export class Location {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;
}

@ObjectType()
export class LocationInfo extends Location {
  @Field(() => Int)
  zoneCount: number;

  @Field(() => [Camp])
  camps: Camp[];
}
