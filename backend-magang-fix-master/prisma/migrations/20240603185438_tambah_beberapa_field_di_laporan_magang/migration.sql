/*
  Warnings:

  - You are about to drop the column `judul` on the `LaporanMagang` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `LaporanMagang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LaporanMagang" DROP COLUMN "judul",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fileLaporan" TEXT,
ADD COLUMN     "jumlahPenonton" INTEGER,
ADD COLUMN     "komentar" TEXT,
ADD COLUMN     "lokasiPresentasi" TEXT,
ADD COLUMN     "metodePresentasi" TEXT DEFAULT 'Individu',
ADD COLUMN     "tanggal" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
