/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "itemsPrice" SET DATA TYPE TEXT,
ALTER COLUMN "totalPrice" SET DATA TYPE TEXT,
ALTER COLUMN "shippingPrice" SET DATA TYPE TEXT,
ALTER COLUMN "taxPrice" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_productId_key" ON "CartItem"("productId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
