import 'reflect-metadata';
import { EntityName } from '../../enums';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { createBaseResolver } from '../baseResolver';
import { ElementArgs } from './element.args';
import { ElementInfo } from './element.model';
import { Context } from '../../types';
import { Monster } from '@prisma/client';

const ElementBaseResolver = createBaseResolver(
  'element',
  ElementInfo,
  ElementArgs,
  EntityName.Element
);

@Resolver(ElementInfo)
export class ElementResolver extends ElementBaseResolver {
  @FieldResolver()
  async monsters(@Root() element: ElementInfo, @Ctx() ctx: Context) {
    return ctx.prisma.element
      .findUnique({ where: { id: element.id } })
      .monster({
        select: { id: true, name: true },
      });
  }
}
