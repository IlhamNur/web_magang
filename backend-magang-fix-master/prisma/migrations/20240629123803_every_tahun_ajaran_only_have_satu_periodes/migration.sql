/*
  Warnings:

  - A unique constraint covering the columns `[tahunAjaranId,periodeKonfirmasiPemilihanSatkerId]` on the table `PeriodeKonfirmasiPemilihanSatker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tahunAjaranId,periodePemilihanTempatMagangId]` on the table `PeriodePemilihanTempatMagang` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tahunAjaranId,periodePengumpulanLaporanMagangId]` on the table `PeriodePengumpulanLaporanMagang` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PeriodeKonfirmasiPemilihanSatker_tahunAjaranId_periodeKonfi_key" ON "PeriodeKonfirmasiPemilihanSatker"("tahunAjaranId", "periodeKonfirmasiPemilihanSatkerId");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodePemilihanTempatMagang_tahunAjaranId_periodePemilihan_key" ON "PeriodePemilihanTempatMagang"("tahunAjaranId", "periodePemilihanTempatMagangId");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodePengumpulanLaporanMagang_tahunAjaranId_periodePengum_key" ON "PeriodePengumpulanLaporanMagang"("tahunAjaranId", "periodePengumpulanLaporanMagangId");
