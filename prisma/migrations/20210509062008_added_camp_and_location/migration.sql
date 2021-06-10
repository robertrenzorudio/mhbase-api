/*
  Warnings:

  - You are about to drop the `Items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Items";

-- CreateTable
CREATE TABLE "Camp" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "zone" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "rarity" INTEGER NOT NULL,
    "carryLimit" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "zoneCount" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item.name_unique" ON "Item"("name");

-- AddForeignKey
ALTER TABLE "Camp" ADD FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
