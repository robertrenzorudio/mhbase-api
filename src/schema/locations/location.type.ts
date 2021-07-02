import 'reflect-metadata';
import { Field, Int, ObjectType } from 'type-graphql';
import { BaseType } from '../shared/baseType';
import { BaseConnection } from '../shared/pageResponse.type';
import { Camp } from './camp.type';

@ObjectType({ implements: BaseType })
export class Location extends BaseType {
  @Field()
  name: string;

  @Field(() => Int)
  zoneCount: number;

  @Field(() => [Camp])
  camps: Camp[];
}

@ObjectType()
export class LocationConnection extends BaseConnection<Location>(Location) {}
