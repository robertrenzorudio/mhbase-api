import 'reflect-metadata';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { DecorationArgs } from './decoration.args';
import { Decoration } from './decoration.model';
import { createBaseResolver } from '../baseResolver';
import { EntityName } from '../../enums';
import { SkillRank } from '../skills/skill-rank.model';
import { Context } from '../../types';

const ItemBaseResolver = createBaseResolver(
  'decoration',
  Decoration,
  DecorationArgs,
  EntityName.Decoration
);

@Resolver(Decoration)
export class DecorationResolver extends ItemBaseResolver {
  @FieldResolver(() => [SkillRank])
  async skills(@Root() decoration: Decoration, @Ctx() ctx: Context) {
    return ctx.prisma.decoration
      .findUnique({ where: { id: decoration.id } })
      .skills({ select: { level: true, skillId: true, skillName: true } });
  }
}
