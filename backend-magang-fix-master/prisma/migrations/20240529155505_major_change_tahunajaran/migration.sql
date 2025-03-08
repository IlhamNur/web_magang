/*
  Warnings:

  - You are about to drop the column `nim` on the `IzinBimbinganSkripsi` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `IzinPresensi` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `KegiatanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `PesertaBimbinganMagang` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `Presensi` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `RekapKegiatanBulanan` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `TipeKegiatan` table. All the data in the column will be lost.
  - You are about to drop the `TahunAjaranDosen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TahunAjaranMahasiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TahunAjaranPembimbingLapangan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mahasiswaId` to the `IzinBimbinganSkripsi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswaId` to the `IzinPresensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswaId` to the `KegiatanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswaId` to the `PesertaBimbinganMagang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswaId` to the `Presensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswaId` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswaId` to the `TipeKegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IzinBimbinganSkripsi" DROP CONSTRAINT "IzinBimbinganSkripsi_nim_fkey";

-- DropForeignKey
ALTER TABLE "IzinPresensi" DROP CONSTRAINT "IzinPresensi_nim_fkey";

-- DropForeignKey
ALTER TABLE "KegiatanHarian" DROP CONSTRAINT "KegiatanHarian_nim_fkey";

-- DropForeignKey
ALTER TABLE "PesertaBimbinganMagang" DROP CONSTRAINT "PesertaBimbinganMagang_nim_fkey";

-- DropForeignKey
ALTER TABLE "Presensi" DROP CONSTRAINT "Presensi_nim_fkey";

-- DropForeignKey
ALTER TABLE "RekapKegiatanBulanan" DROP CONSTRAINT "RekapKegiatanBulanan_nim_fkey";

-- DropForeignKey
ALTER TABLE "TahunAjaranDosen" DROP CONSTRAINT "TahunAjaranDosen_dosenId_fkey";

-- DropForeignKey
ALTER TABLE "TahunAjaranDosen" DROP CONSTRAINT "TahunAjaranDosen_tahunAjaranId_fkey";

-- DropForeignKey
ALTER TABLE "TahunAjaranMahasiswa" DROP CONSTRAINT "TahunAjaranMahasiswa_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "TahunAjaranMahasiswa" DROP CONSTRAINT "TahunAjaranMahasiswa_tahunAjaranId_fkey";

-- DropForeignKey
ALTER TABLE "TahunAjaranPembimbingLapangan" DROP CONSTRAINT "TahunAjaranPembimbingLapangan_pemlapId_fkey";

-- DropForeignKey
ALTER TABLE "TahunAjaranPembimbingLapangan" DROP CONSTRAINT "TahunAjaranPembimbingLapangan_tahunAjaranId_fkey";

-- DropForeignKey
ALTER TABLE "TipeKegiatan" DROP CONSTRAINT "TipeKegiatan_nim_fkey";

-- DropIndex
DROP INDEX "Mahasiswa_nim_key";

-- DropIndex
DROP INDEX "TahunAjaran_tahun_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "IzinBimbinganSkripsi" DROP COLUMN "nim",
ADD COLUMN     "mahasiswaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "IzinPresensi" DROP COLUMN "nim",
ADD COLUMN     "mahasiswaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "KegiatanHarian" DROP COLUMN "nim",
ADD COLUMN     "mahasiswaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PesertaBimbinganMagang" DROP COLUMN "nim",
ADD COLUMN     "mahasiswaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Presensi" DROP COLUMN "nim",
ADD COLUMN     "mahasiswaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RekapKegiatanBulanan" DROP COLUMN "nim",
ADD COLUMN     "mahasiswaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TipeKegiatan" DROP COLUMN "nim",
ADD COLUMN     "mahasiswaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "TahunAjaranDosen";

-- DropTable
DROP TABLE "TahunAjaranMahasiswa";

-- DropTable
DROP TABLE "TahunAjaranPembimbingLapangan";

-- CreateTable
CREATE TABLE "UserTahunAjaran" (
    "userTahunAjaranId" SERIAL NOT NULL,
    "userId" INTEGER,
    "tahunAjaranId" INTEGER,

    CONSTRAINT "UserTahunAjaran_pkey" PRIMARY KEY ("userTahunAjaranId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTahunAjaran_userId_key" ON "UserTahunAjaran"("userId");

-- AddForeignKey
ALTER TABLE "UserTahunAjaran" ADD CONSTRAINT "UserTahunAjaran_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTahunAjaran" ADD CONSTRAINT "UserTahunAjaran_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinBimbinganSkripsi" ADD CONSTRAINT "IzinBimbinganSkripsi_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesertaBimbinganMagang" ADD CONSTRAINT "PesertaBimbinganMagang_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipeKegiatan" ADD CONSTRAINT "TipeKegiatan_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanHarian" ADD CONSTRAINT "KegiatanHarian_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapKegiatanBulanan" ADD CONSTRAINT "RekapKegiatanBulanan_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinPresensi" ADD CONSTRAINT "IzinPresensi_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE RESTRICT ON UPDATE CASCADE;
