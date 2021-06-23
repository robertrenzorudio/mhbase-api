import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Context } from '../../types';
import { createBaseResolver } from '../shared';
import { LocationArgs } from './location.args';
import { LocationInfo } from './location.model';
import { EntityName } from '../../enums';
import { Camp } from './camp.model';

const LocationBaseResolver = createBaseResolver(
  'location',
  LocationInfo,
  LocationArgs,
  EntityName.Location
);

@Resolver(LocationInfo)
export class LocationResolver extends LocationBaseResolver {
  @FieldResolver(() => [Camp])
  async camps(@Root() location: LocationInfo, @Ctx() ctx: Context) {
    return ctx.prisma.location
      .findUnique({ where: { id: location.id } })
      .camps({ select: { name: true, zone: true } });
  }
}
