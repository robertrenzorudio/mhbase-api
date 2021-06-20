import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { Ailment } from '../ailments/ailment.model';
import { Element } from '../elements/element.model';
import { Location } from '../locations/location.model';
import { Reward } from '../rewards/reward.model';
import { Resistance } from './resistance.model';
import { Weakness } from './weakness.model';

@ObjectType()
export class Monster {
  @Field(() => ID)
  readonly id: number;

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
