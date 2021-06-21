import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Context } from '../../types';
import { createBaseResolver } from '../baseResolver';
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
//SELECT "public"."Camp"."id", "public"."Camp"."name", "public"."Camp"."zone", "public"."Camp"."locationId" FROM "public"."Camp" WHERE "public"."Camp"."locationId" IN ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) OFFSET $15
//SELECT "public"."Camp"."id", "public"."Camp"."name", "public"."Camp"."zone", "public"."Camp"."locationId" FROM "public"."Camp" WHERE "public"."Camp"."locationId" IN ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) OFFSET $15
