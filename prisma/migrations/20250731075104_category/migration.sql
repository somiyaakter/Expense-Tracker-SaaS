/*
  Warnings:

  - Added the required column `plaidId` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "plaidId" TEXT NOT NULL;
