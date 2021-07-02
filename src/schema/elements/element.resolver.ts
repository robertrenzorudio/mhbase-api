import 'reflect-metadata';
import { EntityName } from '../../enums';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { createBaseResolver } from '../shared';
import { ElementArgs } from './element.args';
import { Element, ElementConnection } from './element.type';
import { Context } from '../../types';
import { Monster } from '../monsters/monster.type';

const ElementBaseResolver = createBaseResolver(
  'element',
  Element,
  ElementConnection,
  ElementArgs,
  EntityName.Element
);

@Resolver(Element)
export class ElementResolver extends ElementBaseResolver {
  @FieldResolver(() => [Monster])
  async monsters(@Root() element: Element, @Ctx() ctx: Context) {
    return ctx.prisma.element
      .findUnique({ where: { id: element.id } })
      .monster();
  }
}
