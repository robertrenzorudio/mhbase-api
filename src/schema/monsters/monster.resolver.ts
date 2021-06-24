import 'reflect-metadata';
import { Context } from '../../types';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { EntityName } from '../../enums';
import { createBaseResolver } from '../shared';
import { MonsterArgs } from './monster.args';
import { MonsterInfo } from './monster.model';
import { Reward } from '../rewards/reward.model';
import { Ailment } from '../ailments/ailment.model';
import { Location } from '../locations/location.model';
import { Element } from '../elements/element.model';

const MonsterBaseResolver = createBaseResolver(
  'monster',
  MonsterInfo,
  MonsterArgs,
  EntityName.Monster
);

@Resolver(MonsterInfo)
export class MonsterResolver extends MonsterBaseResolver {
  @FieldResolver(() => [Reward])
  async rewards(@Root() monster: MonsterInfo, @Ctx() ctx: Context) {
    return ctx.prisma.monster
      .findUnique({
        where: { id: monster.id },
      })
      .rewards({
        select: {
          id: true,
          item: { select: { id: true, name: true } },
          conditions: true,
        },
      });
  }

  @FieldResolver(() => [Ailment])
  async ailments(@Root() monster: MonsterInfo, @Ctx() ctx: Context) {
    return ctx.prisma.monster
      .findUnique({
        where: { id: monster.id },
      })
      .ailments({ select: { id: true, name: true } });
  }

  @FieldResolver(() => [Location])
  async locations(@Root() monster: MonsterInfo, @Ctx() ctx: Context) {
    return ctx.prisma.monster
      .findUnique({
        where: { id: monster.id },
      })
      .locations({ select: { id: true, name: true } });
  }

  @FieldResolver(() => [Element])
  async elements(@Root() monster: MonsterInfo, @Ctx() ctx: Context) {
    return ctx.prisma.monster
      .findUnique({
        where: { id: monster.id },
      })
      .elements({ select: { id: true, name: true } });
  }
}