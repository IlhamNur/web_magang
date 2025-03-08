/*
  Warnings:

  - You are about to drop the column `komentar` on the `LaporanMagang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LaporanMagang" DROP COLUMN "komentar";

-- CreateTable
CREATE TABLE "PresentasiLaporanMagang" (
    "presentasiId" SERIAL NOT NULL,
    "laporanId" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3),
    "jumlahPenonton" INTEGER,
    "lokasiPresentasi" TEXT,
    "metodePresentasi" TEXT DEFAULT 'Individu',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PresentasiLaporanMagang_pkey" PRIMARY KEY ("presentasiId")
);

-- AddForeignKey
ALTER TABLE "PresentasiLaporanMagang" ADD CONSTRAINT "PresentasiLaporanMagang_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES "LaporanMagang"("laporanId") ON DELETE CASCADE ON UPDATE CASCADE;
