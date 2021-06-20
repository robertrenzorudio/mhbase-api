import 'reflect-metadata';
import { RecoveryActionType } from '../../enums/recoveryActionType';
import { Field, Int, ObjectType } from 'type-graphql';
import { Item } from '../items/item.model';
import { Skill } from '../skills/skill.model';

@ObjectType()
export class Cure {
  readonly id: number;

  @Field(() => RecoveryActionType, { nullable: true })
  action?: RecoveryActionType;

  @Field(() => [Item])
  items: Item[];

  @Field(() => [Skill])
  protections: Skill[];

  ailmentId: number;
}
