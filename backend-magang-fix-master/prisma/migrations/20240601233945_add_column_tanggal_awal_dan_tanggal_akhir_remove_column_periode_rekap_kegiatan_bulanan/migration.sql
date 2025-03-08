/*
  Warnings:

  - You are about to drop the column `periode` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.
  - Added the required column `tanggalAkhir` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalAwal` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RekapKegiatanBulanan" DROP COLUMN "periode",
ADD COLUMN     "tanggalAkhir" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tanggalAwal" TIMESTAMP(3) NOT NULL;
