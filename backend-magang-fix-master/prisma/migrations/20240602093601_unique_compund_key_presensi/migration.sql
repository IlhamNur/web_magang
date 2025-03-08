/*
  Warnings:

  - A unique constraint covering the columns `[tanggal,mahasiswaId]` on the table `Presensi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Presensi_tanggal_mahasiswaId_key" ON "Presensi"("tanggal", "mahasiswaId");
