/*
  Warnings:

  - You are about to drop the `buktiIzinPresensi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "buktiIzinPresensi" DROP CONSTRAINT "buktiIzinPresensi_izinId_fkey";

-- AlterTable
ALTER TABLE "IzinPresensi" ADD COLUMN     "fileBukti" TEXT;

-- DropTable
DROP TABLE "buktiIzinPresensi";
