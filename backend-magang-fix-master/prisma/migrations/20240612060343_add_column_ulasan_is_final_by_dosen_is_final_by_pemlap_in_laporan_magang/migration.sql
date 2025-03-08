-- AlterTable
ALTER TABLE "LaporanMagang" ADD COLUMN     "isFinalByDosen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFinalByPemlap" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ulasan" TEXT;
