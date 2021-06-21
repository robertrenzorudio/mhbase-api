import 'reflect-metadata';
import { Ctx, FieldResolver, Info, Resolver, Root } from 'type-graphql';
import { createBaseResolver } from '../shared';
import { EntityName } from '../../enums';
import { AilmentInfo } from './ailment.model';
import { AilmentArgs } from './ailment.args';
import { Context } from '../../types';
import { Cure } from './cure.model';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';

const AilmentBaseResolver = createBaseResolver(
  'ailment',
  AilmentInfo,
  AilmentArgs,
  EntityName.Ailment
);

@Resolver(AilmentInfo)
export class AilmentResolver extends AilmentBaseResolver {
  @FieldResolver(() => Cure)
  async cure(
    @Root() ailment: AilmentInfo,
    @Ctx() ctx: Context,
    @Info() info: GraphQLResolveInfo
  ) {
    const {
      fieldsByTypeName: { Cure },
    } = parseResolveInfo(info) as ResolveTree;

    return ctx.prisma.ailment
      .findUnique({
        where: { id: ailment.id },
      })
      .cure({
        select: {
          action: !!Cure.action,
          items: !!Cure.items ? { select: { id: true, name: true } } : false,
          protections: !!Cure.protections
            ? { select: { id: true, name: true } }
            : false,
        },
      });
  }
}
