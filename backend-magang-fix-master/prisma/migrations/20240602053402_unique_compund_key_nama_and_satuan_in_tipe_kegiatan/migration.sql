/*
  Warnings:

  - A unique constraint covering the columns `[nama,satuan]` on the table `TipeKegiatan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RekapKegiatanBulananTipeKegiatan" ALTER COLUMN "tingkatKualitas" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "TipeKegiatan_nama_satuan_key" ON "TipeKegiatan"("nama", "satuan");
