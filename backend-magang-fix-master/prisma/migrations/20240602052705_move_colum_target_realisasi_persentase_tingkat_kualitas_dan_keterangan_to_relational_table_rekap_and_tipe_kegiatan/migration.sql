/*
  Warnings:

  - You are about to drop the column `keterangan` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.
  - You are about to drop the column `persentase` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.
  - You are about to drop the column `realisasi` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.
  - You are about to drop the column `tingkatKualitas` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RekapKegiatanBulanan" DROP COLUMN "keterangan",
DROP COLUMN "persentase",
DROP COLUMN "realisasi",
DROP COLUMN "target",
DROP COLUMN "tingkatKualitas";

-- AlterTable
ALTER TABLE "RekapKegiatanBulananTipeKegiatan" ADD COLUMN     "keterangan" TEXT,
ADD COLUMN     "persentase" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "realisasi" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "target" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tingkatKualitas" INTEGER;
