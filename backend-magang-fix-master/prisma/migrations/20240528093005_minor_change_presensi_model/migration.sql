/*
  Warnings:

  - You are about to drop the column `keterangan` on the `Presensi` table. All the data in the column will be lost.
  - You are about to drop the column `waktu` on the `Presensi` table. All the data in the column will be lost.
  - Added the required column `status` to the `Presensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktuDatang` to the `Presensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktuPulang` to the `Presensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Presensi" DROP COLUMN "keterangan",
DROP COLUMN "waktu",
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "waktuDatang" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "waktuPulang" TIMESTAMP(3) NOT NULL;
