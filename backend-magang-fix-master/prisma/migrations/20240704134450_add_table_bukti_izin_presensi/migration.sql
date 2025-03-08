-- AlterTable
ALTER TABLE "IzinPresensi" ADD COLUMN     "jenisIzin" TEXT NOT NULL DEFAULT 'Lainnya';

-- CreateTable
CREATE TABLE "buktiIzinPresensi" (
    "buktiIzinId" SERIAL NOT NULL,
    "izinId" INTEGER NOT NULL,
    "fileBukti" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buktiIzinPresensi_pkey" PRIMARY KEY ("buktiIzinId")
);

-- AddForeignKey
ALTER TABLE "buktiIzinPresensi" ADD CONSTRAINT "buktiIzinPresensi_izinId_fkey" FOREIGN KEY ("izinId") REFERENCES "IzinPresensi"("izinId") ON DELETE CASCADE ON UPDATE CASCADE;
