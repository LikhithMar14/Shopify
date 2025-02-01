-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" JSONB,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "payementMethod" TEXT;
