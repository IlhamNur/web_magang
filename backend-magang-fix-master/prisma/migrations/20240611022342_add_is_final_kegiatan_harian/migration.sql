/*
  Warnings:

  - Made the column `tempat` on table `BimbinganMagang` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BimbinganMagang" ALTER COLUMN "tempat" SET NOT NULL;

-- AlterTable
ALTER TABLE "KegiatanHarian" ADD COLUMN     "isFinal" BOOLEAN NOT NULL DEFAULT false;
