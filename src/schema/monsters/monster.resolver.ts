import 'reflect-metadata';
import { Context } from '../../types';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { EntityName } from '../../enums';
import { createBaseResolver } from '../shared';
import { MonsterArgs } from './monster.args';
import { Monster, MonsterConnection } from './monster.type';
import { Reward } from '../rewards/reward.type';
import { Ailment } from '../ailments/ailment.type';
import { Location } from '../locations/location.type';
import { Element } from '../elements/element.type';

const MonsterBaseResolver = createBaseResolver(
  'monster',
  Monster,
  MonsterConnection,
  MonsterArgs,
  EntityName.Monster
);

@Resolver(Monster)
export class MonsterResolver extends MonsterBaseResolver {
  @FieldResolver(() => [Reward])
  async rewards(@Root() monster: Monster, @Ctx() ctx: Context) {
    return ctx.prisma.monster
      .findUnique({
        where: { id: monster.id },
      })
      .rewards();
  }

  @FieldResolver(() => [Ailment])
  async ailments(@Root() monster: Monster, @Ctx() ctx: Context) {
    return ctx.prisma.monster
      .findUnique({
        where: { id: monster.id },
      })
      .ailments();
  }

  @FieldResolver(() => [Location])
  async locations(@Root() monster: Monster, @Ctx() ctx: Context) {
    return ctx.prisma.monster
      .findUnique({
        where: { id: monster.id },
      })
      .locations();
  }

  @FieldResolver(() => [Element])
  async elements(@Root() monster: Monster, @Ctx() ctx: Context) {
    return ctx.prisma.monster
      .findUnique({
        where: { id: monster.id },
      })
      .elements();
  }
}
