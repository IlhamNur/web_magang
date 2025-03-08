/*
  Warnings:

  - Added the required column `jamMulai` to the `IzinBimbinganSkripsi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jamSelesai` to the `IzinBimbinganSkripsi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IzinBimbinganSkripsi" ADD COLUMN     "jamMulai" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "jamSelesai" TIMESTAMP(3) NOT NULL;
