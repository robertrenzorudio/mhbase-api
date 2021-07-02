import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';
import { Monster } from '../monsters/monster.type';
import { BaseType } from '../shared/baseType';
import { BaseConnection } from '../shared/pageResponse.type';

@ObjectType({ implements: BaseType })
export class Element extends BaseType {
  @Field()
  name: string;

  @Field(() => [Monster], { description: 'Monsters who use the element' })
  monsters: Monster[];
}

@ObjectType()
export class ElementConnection extends BaseConnection<Element>(Element) {}
