-- AddForeignKey
ALTER TABLE "PilihanSatker" ADD CONSTRAINT "PilihanSatker_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PilihanSatker" ADD CONSTRAINT "PilihanSatker_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE CASCADE ON UPDATE CASCADE;
