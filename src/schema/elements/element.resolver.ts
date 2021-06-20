import 'reflect-metadata';
import { EntityName } from '../../enums';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { createBaseResolver } from '../baseResolver';
import { ElementArgs } from './element.args';
import { ElementInfo } from './element.model';
import { Context } from '../../types';

const ElementBaseResolver = createBaseResolver(
  'element',
  ElementInfo,
  ElementArgs,
  EntityName.Element
);

@Resolver(ElementInfo)
export class ElementResolver extends ElementBaseResolver {
  @FieldResolver()
  async monsters(
    @Root() element: ElementInfo,
    @Ctx() ctx: Context
  ): Promise<string[]> {
    const data = await ctx.prisma.element
      .findUnique({ where: { id: element.id } })
      .monster({
        select: { name: true },
      });
    return data.map(({ name }) => name);
  }
}
