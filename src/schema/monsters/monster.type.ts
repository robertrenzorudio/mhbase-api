import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';
import { Ailment } from '../ailments/ailment.type';
import { Element } from '../elements/element.type';
import { Location } from '../locations/location.type';
import { Reward } from '../rewards/reward.type';
import { BaseType } from '../shared/BaseType';
import { BaseConnection } from '../shared/pageResponse.type';
import { Resistance } from './resistance.type';
import { Weakness } from './weakness.type';

@ObjectType({ implements: BaseType })
export class Monster extends BaseType {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  species: string;

  @Field()
  description: string;

  @Field(() => [Resistance])
  resistances: Resistance[];

  @Field(() => [Weakness])
  weaknesses: Weakness[];

  @Field(() => [Ailment])
  ailments: Ailment[];

  @Field(() => [Location])
  locations: Location[];

  @Field(() => [Element])
  elements: Element[];

  @Field(() => [Reward])
  rewards: Reward;
}

@ObjectType()
export class MonsterConnection extends BaseConnection<Monster>(Monster) {}
