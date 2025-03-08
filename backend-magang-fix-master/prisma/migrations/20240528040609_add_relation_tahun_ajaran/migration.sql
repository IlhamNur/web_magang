-- AddForeignKey
ALTER TABLE "TahunAjaranMahasiswa" ADD CONSTRAINT "TahunAjaranMahasiswa_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TahunAjaranDosen" ADD CONSTRAINT "TahunAjaranDosen_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TahunAjaranPembimbingLapangan" ADD CONSTRAINT "TahunAjaranPembimbingLapangan_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE RESTRICT ON UPDATE CASCADE;
