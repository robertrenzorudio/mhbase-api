-- CreateEnum
CREATE TYPE "ElementType" AS ENUM ('fire', 'water', 'ice', 'thunder', 'dragon', 'blast', 'poison', 'sleep', 'paralysis', 'stun');

-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "element" "ElementType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "type" VARCHAR(6) NOT NULL,
    "species" VARCHAR(15) NOT NULL,
    "description" VARCHAR(400) NOT NULL,
    "resistances" JSONB NOT NULL,
    "weakness" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "conditions" JSONB NOT NULL,
    "itemId" INTEGER NOT NULL,
    "monsterId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AilmentToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ElementToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Monster.name_unique" ON "Monster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AilmentToMonster_AB_unique" ON "_AilmentToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_AilmentToMonster_B_index" ON "_AilmentToMonster"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ElementToMonster_AB_unique" ON "_ElementToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_ElementToMonster_B_index" ON "_ElementToMonster"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToMonster_AB_unique" ON "_LocationToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToMonster_B_index" ON "_LocationToMonster"("B");

-- AddForeignKey
ALTER TABLE "Reward" ADD FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AilmentToMonster" ADD FOREIGN KEY ("A") REFERENCES "Ailment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AilmentToMonster" ADD FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementToMonster" ADD FOREIGN KEY ("A") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementToMonster" ADD FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToMonster" ADD FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToMonster" ADD FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
