-- CreateTable
CREATE TABLE "PeriodeRekapKegiatanBulanan" (
    "periodeRekapId" SERIAL NOT NULL,
    "tahunAjaranId" INTEGER NOT NULL,
    "tanggalAwal" TIMESTAMP(3) NOT NULL,
    "tanggalAkhir" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeriodeRekapKegiatanBulanan_pkey" PRIMARY KEY ("periodeRekapId")
);

-- AddForeignKey
ALTER TABLE "PeriodeRekapKegiatanBulanan" ADD CONSTRAINT "PeriodeRekapKegiatanBulanan_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE CASCADE ON UPDATE CASCADE;
