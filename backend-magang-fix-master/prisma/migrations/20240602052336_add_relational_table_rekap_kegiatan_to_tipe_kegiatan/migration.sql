/*
  Warnings:

  - You are about to drop the column `uraian` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KegiatanHarian" ALTER COLUMN "durasi" SET DEFAULT 0,
ALTER COLUMN "durasi" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RekapKegiatanBulanan" DROP COLUMN "uraian";

-- CreateTable
CREATE TABLE "RekapKegiatanBulananTipeKegiatan" (
    "rekapTipeId" SERIAL NOT NULL,
    "rekapId" INTEGER NOT NULL,
    "tipeKegiatanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RekapKegiatanBulananTipeKegiatan_pkey" PRIMARY KEY ("rekapTipeId")
);

-- AddForeignKey
ALTER TABLE "RekapKegiatanBulananTipeKegiatan" ADD CONSTRAINT "RekapKegiatanBulananTipeKegiatan_rekapId_fkey" FOREIGN KEY ("rekapId") REFERENCES "RekapKegiatanBulanan"("rekapId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapKegiatanBulananTipeKegiatan" ADD CONSTRAINT "RekapKegiatanBulananTipeKegiatan_tipeKegiatanId_fkey" FOREIGN KEY ("tipeKegiatanId") REFERENCES "TipeKegiatan"("tipeKegiatanId") ON DELETE CASCADE ON UPDATE CASCADE;
