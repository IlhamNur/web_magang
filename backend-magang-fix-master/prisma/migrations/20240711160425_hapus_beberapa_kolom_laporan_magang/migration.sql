/*
  Warnings:

  - You are about to drop the column `isFinalByDosen` on the `LaporanMagang` table. All the data in the column will be lost.
  - You are about to drop the column `isFinalByPemlap` on the `LaporanMagang` table. All the data in the column will be lost.
  - You are about to drop the column `jumlahPenonton` on the `LaporanMagang` table. All the data in the column will be lost.
  - You are about to drop the column `komentar` on the `LaporanMagang` table. All the data in the column will be lost.
  - You are about to drop the column `lokasiPresentasi` on the `LaporanMagang` table. All the data in the column will be lost.
  - You are about to drop the column `metodePresentasi` on the `LaporanMagang` table. All the data in the column will be lost.
  - You are about to drop the column `ulasan` on the `LaporanMagang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LaporanMagang" DROP COLUMN "isFinalByDosen",
DROP COLUMN "isFinalByPemlap",
DROP COLUMN "jumlahPenonton",
DROP COLUMN "komentar",
DROP COLUMN "lokasiPresentasi",
DROP COLUMN "metodePresentasi",
DROP COLUMN "ulasan";
