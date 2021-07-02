import 'reflect-metadata';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { DecorationArgs } from './decoration.args';
import { Decoration, DecorationConnection } from './decoration.type';
import { createBaseResolver } from '../shared';
import { EntityName } from '../../enums';
import { SkillRank } from '../skills/skill-rank.type';
import { Context } from '../../types';

const ItemBaseResolver = createBaseResolver(
  'decoration',
  Decoration,
  DecorationConnection,
  DecorationArgs,
  EntityName.Decoration
);

@Resolver(Decoration)
export class DecorationResolver extends ItemBaseResolver {
  @FieldResolver(() => [SkillRank])
  async skills(@Root() decoration: Decoration, @Ctx() ctx: Context) {
    return ctx.prisma.decoration
      .findUnique({ where: { id: decoration.id } })
      .skills();
  }
}
