/*
  Warnings:

  - You are about to drop the column `status` on the `IzinBimbinganSkripsi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IzinBimbinganSkripsi" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "LaporanMagang" (
    "laporanId" SERIAL NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "judul" TEXT NOT NULL,

    CONSTRAINT "LaporanMagang_pkey" PRIMARY KEY ("laporanId")
);

-- CreateTable
CREATE TABLE "Penilian" (
    "penilianId" SERIAL NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,

    CONSTRAINT "Penilian_pkey" PRIMARY KEY ("penilianId")
);

-- CreateTable
CREATE TABLE "PenilaianBimbingan" (
    "penilaianBimbinganId" SERIAL NOT NULL,
    "penilianId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenilaianBimbingan_pkey" PRIMARY KEY ("penilaianBimbinganId")
);

-- CreateTable
CREATE TABLE "PenilaianKinerja" (
    "penilaianKinerjaId" SERIAL NOT NULL,
    "penilianId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenilaianKinerja_pkey" PRIMARY KEY ("penilaianKinerjaId")
);

-- CreateTable
CREATE TABLE "PenilaianLaporanDosen" (
    "penilaianLaporanDosenId" SERIAL NOT NULL,
    "penilianId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenilaianLaporanDosen_pkey" PRIMARY KEY ("penilaianLaporanDosenId")
);

-- CreateTable
CREATE TABLE "PenilaianLaporanPemlap" (
    "penilaianLaporanPemlapId" SERIAL NOT NULL,
    "penilianId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenilaianLaporanPemlap_pkey" PRIMARY KEY ("penilaianLaporanPemlapId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LaporanMagang_mahasiswaId_key" ON "LaporanMagang"("mahasiswaId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianBimbingan_penilianId_key" ON "PenilaianBimbingan"("penilianId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianKinerja_penilianId_key" ON "PenilaianKinerja"("penilianId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianLaporanDosen_penilianId_key" ON "PenilaianLaporanDosen"("penilianId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianLaporanPemlap_penilianId_key" ON "PenilaianLaporanPemlap"("penilianId");

-- AddForeignKey
ALTER TABLE "LaporanMagang" ADD CONSTRAINT "LaporanMagang_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penilian" ADD CONSTRAINT "Penilian_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianBimbingan" ADD CONSTRAINT "PenilaianBimbingan_penilianId_fkey" FOREIGN KEY ("penilianId") REFERENCES "Penilian"("penilianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianKinerja" ADD CONSTRAINT "PenilaianKinerja_penilianId_fkey" FOREIGN KEY ("penilianId") REFERENCES "Penilian"("penilianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianLaporanDosen" ADD CONSTRAINT "PenilaianLaporanDosen_penilianId_fkey" FOREIGN KEY ("penilianId") REFERENCES "Penilian"("penilianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianLaporanPemlap" ADD CONSTRAINT "PenilaianLaporanPemlap_penilianId_fkey" FOREIGN KEY ("penilianId") REFERENCES "Penilian"("penilianId") ON DELETE CASCADE ON UPDATE CASCADE;
