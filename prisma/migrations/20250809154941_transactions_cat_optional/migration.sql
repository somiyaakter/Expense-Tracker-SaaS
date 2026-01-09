-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
