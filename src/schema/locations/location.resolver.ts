import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Context } from '../../types';
import { createBaseResolver } from '../shared';
import { LocationArgs } from './location.args';
import { Location, LocationConnection } from './location.type';
import { EntityName } from '../../enums';
import { Camp } from './camp.type';

const LocationBaseResolver = createBaseResolver(
  'location',
  Location,
  LocationConnection,
  LocationArgs,
  EntityName.Location
);

@Resolver(Location)
export class LocationResolver extends LocationBaseResolver {
  @FieldResolver(() => [Camp])
  async camps(@Root() location: Location, @Ctx() ctx: Context) {
    return ctx.prisma.location
      .findUnique({ where: { id: location.id } })
      .camps();
  }
}
