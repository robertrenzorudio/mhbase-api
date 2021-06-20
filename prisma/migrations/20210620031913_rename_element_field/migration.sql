/*
  Warnings:

  - You are about to drop the column `element` on the `Element` table. All the data in the column will be lost.
  - Added the required column `name` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Element"
RENAME COLUMN "element" TO "name"
