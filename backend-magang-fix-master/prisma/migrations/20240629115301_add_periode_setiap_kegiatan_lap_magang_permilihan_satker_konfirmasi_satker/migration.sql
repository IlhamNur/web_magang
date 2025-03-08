-- CreateTable
CREATE TABLE "PeriodePemilihanTempatMagang" (
    "periodePemilihanTempatMagang" SERIAL NOT NULL,
    "tahunAjaranId" INTEGER NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalAkhir" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeriodePemilihanTempatMagang_pkey" PRIMARY KEY ("periodePemilihanTempatMagang")
);

-- CreateTable
CREATE TABLE "PeriodePengumpulanLaporanMagang" (
    "periodePengumpulanLaporanMagang" SERIAL NOT NULL,
    "tahunAjaranId" INTEGER NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalAkhir" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeriodePengumpulanLaporanMagang_pkey" PRIMARY KEY ("periodePengumpulanLaporanMagang")
);

-- CreateTable
CREATE TABLE "PeriodeKonfirmasiPemilihanSatker" (
    "periodeKonfirmasiPemilihanSatker" SERIAL NOT NULL,
    "tahunAjaranId" INTEGER NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalAkhir" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeriodeKonfirmasiPemilihanSatker_pkey" PRIMARY KEY ("periodeKonfirmasiPemilihanSatker")
);

-- AddForeignKey
ALTER TABLE "PeriodePemilihanTempatMagang" ADD CONSTRAINT "PeriodePemilihanTempatMagang_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodePengumpulanLaporanMagang" ADD CONSTRAINT "PeriodePengumpulanLaporanMagang_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodeKonfirmasiPemilihanSatker" ADD CONSTRAINT "PeriodeKonfirmasiPemilihanSatker_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE CASCADE ON UPDATE CASCADE;
