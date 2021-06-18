/*
  Warnings:

  - You are about to alter the column `name` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.

*/
-- CreateEnum
CREATE TYPE "RecoveryAction" AS ENUM ('Dodge', 'Crouch');

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "name" SET DATA TYPE VARCHAR(40);

-- CreateTable
CREATE TABLE "Ailment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cure" (
    "id" SERIAL NOT NULL,
    "action" "RecoveryAction",
    "ailmentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CureToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CureToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ailment.name_unique" ON "Ailment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cure_ailmentId_unique" ON "Cure"("ailmentId");

-- CreateIndex
CREATE UNIQUE INDEX "_CureToItem_AB_unique" ON "_CureToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CureToItem_B_index" ON "_CureToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CureToSkill_AB_unique" ON "_CureToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CureToSkill_B_index" ON "_CureToSkill"("B");

-- AddForeignKey
ALTER TABLE "Cure" ADD FOREIGN KEY ("ailmentId") REFERENCES "Ailment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CureToItem" ADD FOREIGN KEY ("A") REFERENCES "Cure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CureToItem" ADD FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CureToSkill" ADD FOREIGN KEY ("A") REFERENCES "Cure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CureToSkill" ADD FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
