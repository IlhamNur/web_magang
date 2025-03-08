/*
  Warnings:

  - You are about to drop the column `adminProvinsiId` on the `Satker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_adminProvinsiId_fkey";

-- AlterTable
ALTER TABLE "Satker" DROP COLUMN "adminProvinsiId";
