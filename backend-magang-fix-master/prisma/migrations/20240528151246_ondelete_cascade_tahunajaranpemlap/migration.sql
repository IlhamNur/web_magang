-- DropForeignKey
ALTER TABLE "TahunAjaranPembimbingLapangan" DROP CONSTRAINT "TahunAjaranPembimbingLapangan_pemlapId_fkey";

-- DropForeignKey
ALTER TABLE "TahunAjaranPembimbingLapangan" DROP CONSTRAINT "TahunAjaranPembimbingLapangan_tahunAjaranId_fkey";

-- AddForeignKey
ALTER TABLE "TahunAjaranPembimbingLapangan" ADD CONSTRAINT "TahunAjaranPembimbingLapangan_pemlapId_fkey" FOREIGN KEY ("pemlapId") REFERENCES "PembimbingLapangan"("pemlapId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TahunAjaranPembimbingLapangan" ADD CONSTRAINT "TahunAjaranPembimbingLapangan_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE CASCADE ON UPDATE CASCADE;
