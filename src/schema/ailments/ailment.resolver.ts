import 'reflect-metadata';
import { Ctx, FieldResolver, Info, Resolver, Root } from 'type-graphql';
import { createBaseResolver } from '../shared';
import { EntityName } from '../../enums';
import { Ailment, AilmentConnection } from './ailment.type';
import { AilmentArgs } from './ailment.args';
import { Context } from '../../types';
import { Cure } from './cure.type';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';

const AilmentBaseResolver = createBaseResolver(
  'ailment',
  Ailment,
  AilmentConnection,
  AilmentArgs,
  EntityName.Ailment
);

@Resolver(Ailment)
export class AilmentResolver extends AilmentBaseResolver {
  @FieldResolver(() => Cure)
  async cure(
    @Root() ailment: Ailment,
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
          items: !!Cure.items,
          protections: !!Cure.protections,
        },
      });
  }
}
