-- CreateTable
CREATE TABLE "PresensiManual" (
    "presensiManualId" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktuDatang" TIMESTAMP(3),
    "waktuPulang" TIMESTAMP(3),
    "bukti" TEXT,
    "keterangan" TEXT,
    "mahasiswaId" INTEGER NOT NULL,
    "disetujui" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PresensiManual_pkey" PRIMARY KEY ("presensiManualId")
);

-- AddForeignKey
ALTER TABLE "PresensiManual" ADD CONSTRAINT "PresensiManual_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;
