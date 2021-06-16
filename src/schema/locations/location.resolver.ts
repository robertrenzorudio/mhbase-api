import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Context } from '../../types';
import { createBaseResolver } from '../baseResolver';
import { Camp } from './camp.model';
import { LocationArgs } from './location.args';
import { Location } from './location.model';
import { EntityName } from '../../enums';

const LocationBaseResolver = createBaseResolver(
  'location',
  Location,
  LocationArgs,
  EntityName.Location
);

@Resolver(Location)
export class LocationResolver extends LocationBaseResolver {
  @FieldResolver()
  async camps(
    @Root() location: Location,
    @Ctx() ctx: Context
  ): Promise<Camp[]> {
    return ctx.prisma.location
      .findUnique({ where: { id: location.id } })
      .camps();
  }
}
