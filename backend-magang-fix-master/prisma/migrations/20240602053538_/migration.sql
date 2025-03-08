/*
  Warnings:

  - A unique constraint covering the columns `[nama,satuan,mahasiswaId]` on the table `TipeKegiatan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TipeKegiatan_nama_satuan_key";

-- CreateIndex
CREATE UNIQUE INDEX "TipeKegiatan_nama_satuan_mahasiswaId_key" ON "TipeKegiatan"("nama", "satuan", "mahasiswaId");
