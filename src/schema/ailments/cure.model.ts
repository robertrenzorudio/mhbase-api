import 'reflect-metadata';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Item } from '../items/item.model';
import { Skill } from '../skills/skill.model';

@ObjectType()
export class Cure {
  readonly id: number;

  @Field({ nullable: true })
  action?: string;

  @Field(() => [Item])
  items: Item[];

  @Field(() => [Skill])
  protections: Skill[];

  @Field(() => Int)
  ailmentId: number;
}
