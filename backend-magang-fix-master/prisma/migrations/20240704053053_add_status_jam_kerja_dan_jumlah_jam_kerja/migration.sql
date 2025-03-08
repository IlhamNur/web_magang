-- AlterTable
ALTER TABLE "Presensi" ADD COLUMN     "jumlahJamKerja" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "statusJamKerja" TEXT DEFAULT 'Kurang';
