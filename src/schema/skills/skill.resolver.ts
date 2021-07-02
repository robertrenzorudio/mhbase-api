import 'reflect-metadata';
import { Ctx, FieldResolver, Info, Resolver, Root } from 'type-graphql';
import { Context } from '../../types';
import { Skill, SkillConnection } from './skill.type';
import { SkillRank } from './skill-rank.type';
import { SkillArgs } from './skill.args';
import { createBaseResolver } from '../shared';
import { EntityName } from '../../enums';
import { GraphQLResolveInfo } from 'graphql';
import {
  FieldsByTypeName,
  parseResolveInfo,
  ResolveTree,
} from 'graphql-parse-resolve-info';

const SkillBaseResolver = createBaseResolver(
  'skill',
  Skill,
  SkillConnection,
  SkillArgs,
  EntityName.Skill
);

@Resolver(Skill)
export class SkillResolver extends SkillBaseResolver {
  skillRankSelect: ResolveTree | undefined = undefined;
  @FieldResolver(() => [SkillRank])
  async ranks(
    @Root() skill: Skill,
    @Ctx() ctx: Context,
    @Info() info: GraphQLResolveInfo
  ) {
    if (!this.skillRankSelect) {
      const {
        fieldsByTypeName: { SkillRank },
      } = parseResolveInfo(info) as FieldsByTypeName;
      this.skillRankSelect = SkillRank;
    }

    const ranks = await ctx.prisma.skill
      .findUnique({ where: { id: skill.id } })
      .ranks({
        select: {
          level: 'level' in this.skillRankSelect,
          skillName: 'skillName' in this.skillRankSelect,
          skillId: 'skillId' in this.skillRankSelect,
          description: 'description' in this.skillRankSelect,
          modifiers: 'modifiers' in this.skillRankSelect,
        },
      });

    this.skillRankSelect = undefined;

    return ranks;
  }
}
