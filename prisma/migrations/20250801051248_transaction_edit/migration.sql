/*
  Warnings:

  - You are about to drop the column `accountsId` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_accountsId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "accountsId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
