/*
  Warnings:

  - You are about to drop the column `slug` on the `SkillRank` table. All the data in the column will be lost.
  - You are about to drop the column `skill` on the `SkillRank` table. All the data in the column will be lost.
  - Added the required column `skillName` to the `SkillRank` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SkillRank.slug_unique";

-- AlterTable
ALTER TABLE "SkillRank" DROP COLUMN "slug",
DROP COLUMN "skill",
ADD COLUMN     "skillName" VARCHAR(40) NOT NULL;
