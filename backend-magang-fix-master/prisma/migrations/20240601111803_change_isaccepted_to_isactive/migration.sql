/*
  Warnings:

  - You are about to drop the column `isAccepted` on the `PilihanSatker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PilihanSatker" DROP COLUMN "isAccepted",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
