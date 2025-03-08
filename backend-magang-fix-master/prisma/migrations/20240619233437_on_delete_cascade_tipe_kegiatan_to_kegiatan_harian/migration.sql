-- DropForeignKey
ALTER TABLE "KegiatanHarian" DROP CONSTRAINT "KegiatanHarian_tipeKegiatanId_fkey";

-- AddForeignKey
ALTER TABLE "KegiatanHarian" ADD CONSTRAINT "KegiatanHarian_tipeKegiatanId_fkey" FOREIGN KEY ("tipeKegiatanId") REFERENCES "TipeKegiatan"("tipeKegiatanId") ON DELETE CASCADE ON UPDATE CASCADE;
