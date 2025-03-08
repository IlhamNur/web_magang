/*
  Warnings:

  - You are about to drop the `PeriodeRekapKegiatanBulanan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tanggalAwal,tanggalAkhir,mahasiswaId]` on the table `RekapKegiatanBulanan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PeriodeRekapKegiatanBulanan" DROP CONSTRAINT "PeriodeRekapKegiatanBulanan_tahunAjaranId_fkey";

-- DropTable
DROP TABLE "PeriodeRekapKegiatanBulanan";

-- CreateIndex
CREATE UNIQUE INDEX "RekapKegiatanBulanan_tanggalAwal_tanggalAkhir_mahasiswaId_key" ON "RekapKegiatanBulanan"("tanggalAwal", "tanggalAkhir", "mahasiswaId");
