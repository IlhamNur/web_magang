/*
  Warnings:

  - You are about to drop the column `laporanId` on the `PresentasiLaporanMagang` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PresentasiLaporanMagang" DROP CONSTRAINT "PresentasiLaporanMagang_laporanId_fkey";

-- AlterTable
ALTER TABLE "PresentasiLaporanMagang" DROP COLUMN "laporanId";
