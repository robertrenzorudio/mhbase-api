import 'reflect-metadata';
import { Ctx, FieldResolver, Info, Resolver, Root } from 'type-graphql';
import { Context } from '../../types';
import { SkillInfo } from './skill.model';
import { SkillRankInfo } from './skill-rank.model';
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
  SkillInfo,
  SkillArgs,
  EntityName.Skill
);

@Resolver(SkillInfo)
export class SkillResolver extends SkillBaseResolver {
  skillRankSelect: ResolveTree | undefined = undefined;
  @FieldResolver(() => [SkillRankInfo])
  async ranks(
    @Root() skill: SkillInfo,
    @Ctx() ctx: Context,
    @Info() info: GraphQLResolveInfo
  ) {
    if (!this.skillRankSelect) {
      const {
        fieldsByTypeName: { SkillRankInfo },
      } = parseResolveInfo(info) as FieldsByTypeName;
      this.skillRankSelect = SkillRankInfo;
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
