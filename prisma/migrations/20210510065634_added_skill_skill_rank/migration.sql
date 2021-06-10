/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillRank" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(40) NOT NULL,
    "skill" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "modifiers" JSONB,
    "skillId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill.slug_unique" ON "Skill"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Skill.name_unique" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SkillRank.slug_unique" ON "SkillRank"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Location.name_unique" ON "Location"("name");

-- AddForeignKey
ALTER TABLE "SkillRank" ADD FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
