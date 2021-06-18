-- CreateTable
CREATE TABLE "Decoration" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "rarity" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DecorationToSkillRank" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Decoration.name_unique" ON "Decoration"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_DecorationToSkillRank_AB_unique" ON "_DecorationToSkillRank"("A", "B");

-- CreateIndex
CREATE INDEX "_DecorationToSkillRank_B_index" ON "_DecorationToSkillRank"("B");

-- AddForeignKey
ALTER TABLE "_DecorationToSkillRank" ADD FOREIGN KEY ("A") REFERENCES "Decoration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DecorationToSkillRank" ADD FOREIGN KEY ("B") REFERENCES "SkillRank"("id") ON DELETE CASCADE ON UPDATE CASCADE;
