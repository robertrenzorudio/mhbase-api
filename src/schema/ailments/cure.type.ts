import 'reflect-metadata';
import { RecoveryActionType } from '../../enums/recoveryActionType';
import { Field, ObjectType } from 'type-graphql';
import { Item } from '../items/item.type';
import { Skill } from '../skills/skill.type';

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
