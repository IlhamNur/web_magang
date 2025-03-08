/*
  Warnings:

  - You are about to drop the column `waktuDatang` on the `PresensiManual` table. All the data in the column will be lost.
  - You are about to drop the column `waktuPulang` on the `PresensiManual` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PresensiManual" DROP COLUMN "waktuDatang",
DROP COLUMN "waktuPulang",
ALTER COLUMN "tanggal" SET DATA TYPE TEXT;
