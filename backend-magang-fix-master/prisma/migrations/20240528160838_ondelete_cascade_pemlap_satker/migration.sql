-- DropForeignKey
ALTER TABLE "PembimbingLapangan" DROP CONSTRAINT "PembimbingLapangan_kodeSatker_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_adminProvinsiId_fkey";

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminProvinsiId_fkey" FOREIGN KEY ("adminProvinsiId") REFERENCES "AdminProvinsi"("adminProvinsiId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembimbingLapangan" ADD CONSTRAINT "PembimbingLapangan_kodeSatker_fkey" FOREIGN KEY ("kodeSatker") REFERENCES "Satker"("kode") ON DELETE CASCADE ON UPDATE CASCADE;
