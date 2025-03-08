/*
  Warnings:

  - The primary key for the `PeriodeKonfirmasiPemilihanSatker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `periodeKonfirmasiPemilihanSatker` on the `PeriodeKonfirmasiPemilihanSatker` table. All the data in the column will be lost.
  - The primary key for the `PeriodePemilihanTempatMagang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `periodePemilihanTempatMagang` on the `PeriodePemilihanTempatMagang` table. All the data in the column will be lost.
  - The primary key for the `PeriodePengumpulanLaporanMagang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `periodePengumpulanLaporanMagang` on the `PeriodePengumpulanLaporanMagang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PeriodeKonfirmasiPemilihanSatker" DROP CONSTRAINT "PeriodeKonfirmasiPemilihanSatker_pkey",
DROP COLUMN "periodeKonfirmasiPemilihanSatker",
ADD COLUMN     "periodeKonfirmasiPemilihanSatkerId" SERIAL NOT NULL,
ADD CONSTRAINT "PeriodeKonfirmasiPemilihanSatker_pkey" PRIMARY KEY ("periodeKonfirmasiPemilihanSatkerId");

-- AlterTable
ALTER TABLE "PeriodePemilihanTempatMagang" DROP CONSTRAINT "PeriodePemilihanTempatMagang_pkey",
DROP COLUMN "periodePemilihanTempatMagang",
ADD COLUMN     "periodePemilihanTempatMagangId" SERIAL NOT NULL,
ADD CONSTRAINT "PeriodePemilihanTempatMagang_pkey" PRIMARY KEY ("periodePemilihanTempatMagangId");

-- AlterTable
ALTER TABLE "PeriodePengumpulanLaporanMagang" DROP CONSTRAINT "PeriodePengumpulanLaporanMagang_pkey",
DROP COLUMN "periodePengumpulanLaporanMagang",
ADD COLUMN     "periodePengumpulanLaporanMagangId" SERIAL NOT NULL,
ADD CONSTRAINT "PeriodePengumpulanLaporanMagang_pkey" PRIMARY KEY ("periodePengumpulanLaporanMagangId");
