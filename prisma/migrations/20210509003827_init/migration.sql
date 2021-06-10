-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "rarity" INTEGER NOT NULL,
    "carryLimit" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Items.name_unique" ON "Items"("name");
