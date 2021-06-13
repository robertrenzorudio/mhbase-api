import { EntityName } from '../enums';
import { prisma } from '../db';

export const getEntity = (entityName: EntityName) => {
  switch (entityName) {
    case EntityName.Item:
      return prisma.item;

    case EntityName.Location:
      return prisma.location;

    case EntityName.Skill:
      return prisma.skill;

    default:
      return undefined;
  }
};
