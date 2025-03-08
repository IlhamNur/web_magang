/*
  Warnings:

  - Added the required column `uraian` to the `RekapKegiatanBulananTipeKegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RekapKegiatanBulananTipeKegiatan" ADD COLUMN     "uraian" TEXT NOT NULL;
