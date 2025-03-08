/*
  Warnings:

  - The `waktuDatang` column on the `Presensi` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `waktuPulang` column on the `Presensi` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `tanggal` on the `Presensi` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tanggal` on the `PresensiManual` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Presensi" DROP COLUMN "tanggal",
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL,
DROP COLUMN "waktuDatang",
ADD COLUMN     "waktuDatang" TIMESTAMP(3),
DROP COLUMN "waktuPulang",
ADD COLUMN     "waktuPulang" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PresensiManual" DROP COLUMN "tanggal",
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Presensi_tanggal_mahasiswaId_key" ON "Presensi"("tanggal", "mahasiswaId");
