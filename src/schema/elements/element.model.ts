import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { Monster } from '../monsters/monster.model';

@ObjectType()
export class Element {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;
}

@ObjectType()
export class ElementInfo extends Element {
  @Field(() => [Monster], { description: 'Monsters who use the element' })
  monsters: Monster[];
}
