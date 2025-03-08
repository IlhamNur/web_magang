/*
  Warnings:

  - A unique constraint covering the columns `[mahasiswaId]` on the table `PresentasiLaporanMagang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mahasiswaId` to the `PresentasiLaporanMagang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PresentasiLaporanMagang" ADD COLUMN     "mahasiswaId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PresentasiLaporanMagang_mahasiswaId_key" ON "PresentasiLaporanMagang"("mahasiswaId");

-- AddForeignKey
ALTER TABLE "PresentasiLaporanMagang" ADD CONSTRAINT "PresentasiLaporanMagang_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;
