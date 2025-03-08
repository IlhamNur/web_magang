/*
  Warnings:

  - You are about to drop the column `satuan` on the `KegiatanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `satuan` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.
  - Added the required column `satuan` to the `TipeKegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KegiatanHarian" DROP COLUMN "satuan";

-- AlterTable
ALTER TABLE "RekapKegiatanBulanan" DROP COLUMN "satuan";

-- AlterTable
ALTER TABLE "TipeKegiatan" ADD COLUMN     "satuan" TEXT NOT NULL;
