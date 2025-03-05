/*
  Warnings:

  - The `followersCount` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `reviewCount` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "followersCount",
ADD COLUMN     "followersCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "reviewCount" SET NOT NULL,
ALTER COLUMN "reviewCount" SET DEFAULT 0;
