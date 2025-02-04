/*
  Warnings:

  - You are about to drop the column `taxPrice` on the `Cart` table. All the data in the column will be lost.
  - Changed the type of `qty` on the `CartItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "taxPrice";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "qty",
ADD COLUMN     "qty" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "rating" SET DATA TYPE TEXT;
