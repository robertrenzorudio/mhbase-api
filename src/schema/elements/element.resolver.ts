import 'reflect-metadata';
import { EntityName } from '../../enums';
import { Ctx, Field, FieldResolver, Resolver, Root } from 'type-graphql';
import { createBaseResolver } from '../baseResolver';
import { ElementArgs } from './element.args';
import { Element } from './element.model';
import { Context } from '../../types';

const ElementBaseResolver = createBaseResolver(
  'element',
  Element,
  ElementArgs,
  EntityName.Element
);

@Resolver(Element)
export class ElementResolver extends ElementBaseResolver {
  @FieldResolver()
  async monsters(
    @Root() element: Element,
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
