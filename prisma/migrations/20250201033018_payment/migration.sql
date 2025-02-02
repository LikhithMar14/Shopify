/*
  Warnings:

  - You are about to drop the column `payementMethod` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "payementMethod",
ADD COLUMN     "paymentMethod" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'NO_NAME',
ALTER COLUMN "email" SET NOT NULL;

-- RenameIndex
ALTER INDEX "User_email_key" RENAME TO "user_email_idx";
