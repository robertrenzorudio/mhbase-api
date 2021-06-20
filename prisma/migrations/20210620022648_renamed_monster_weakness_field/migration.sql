/*
  Warnings:

  - You are about to drop the column `weakness` on the `Monster` table. All the data in the column will be lost.
  - Added the required column `weaknesses` to the `Monster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Monster" DROP COLUMN "weakness",
ADD COLUMN     "weaknesses" JSONB NOT NULL;
