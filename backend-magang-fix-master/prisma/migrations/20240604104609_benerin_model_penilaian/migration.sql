/*
  Warnings:

  - You are about to drop the `Penilian` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[penilianId,penilaianBimbinganId]` on the table `PenilaianBimbingan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[penilianId,penilaianKinerjaId]` on the table `PenilaianKinerja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[penilianId,penilaianLaporanDosenId]` on the table `PenilaianLaporanDosen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[penilianId,penilaianLaporanPemlapId]` on the table `PenilaianLaporanPemlap` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PenilaianBimbingan" DROP CONSTRAINT "PenilaianBimbingan_penilianId_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianKinerja" DROP CONSTRAINT "PenilaianKinerja_penilianId_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianLaporanDosen" DROP CONSTRAINT "PenilaianLaporanDosen_penilianId_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianLaporanPemlap" DROP CONSTRAINT "PenilaianLaporanPemlap_penilianId_fkey";

-- DropForeignKey
ALTER TABLE "Penilian" DROP CONSTRAINT "Penilian_mahasiswaId_fkey";

-- DropTable
DROP TABLE "Penilian";

-- CreateTable
CREATE TABLE "Penilaian" (
    "penilianId" SERIAL NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,

    CONSTRAINT "Penilaian_pkey" PRIMARY KEY ("penilianId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Penilaian_mahasiswaId_key" ON "Penilaian"("mahasiswaId");

-- CreateIndex
CREATE UNIQUE INDEX "Penilaian_mahasiswaId_penilianId_key" ON "Penilaian"("mahasiswaId", "penilianId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianBimbingan_penilianId_penilaianBimbinganId_key" ON "PenilaianBimbingan"("penilianId", "penilaianBimbinganId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianKinerja_penilianId_penilaianKinerjaId_key" ON "PenilaianKinerja"("penilianId", "penilaianKinerjaId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianLaporanDosen_penilianId_penilaianLaporanDosenId_key" ON "PenilaianLaporanDosen"("penilianId", "penilaianLaporanDosenId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianLaporanPemlap_penilianId_penilaianLaporanPemlapId_key" ON "PenilaianLaporanPemlap"("penilianId", "penilaianLaporanPemlapId");

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianBimbingan" ADD CONSTRAINT "PenilaianBimbingan_penilianId_fkey" FOREIGN KEY ("penilianId") REFERENCES "Penilaian"("penilianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianKinerja" ADD CONSTRAINT "PenilaianKinerja_penilianId_fkey" FOREIGN KEY ("penilianId") REFERENCES "Penilaian"("penilianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianLaporanDosen" ADD CONSTRAINT "PenilaianLaporanDosen_penilianId_fkey" FOREIGN KEY ("penilianId") REFERENCES "Penilaian"("penilianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianLaporanPemlap" ADD CONSTRAINT "PenilaianLaporanPemlap_penilianId_fkey" FOREIGN KEY ("penilianId") REFERENCES "Penilaian"("penilianId") ON DELETE CASCADE ON UPDATE CASCADE;
