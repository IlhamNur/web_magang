/*
  Warnings:

  - You are about to drop the column `kodeProvinsi` on the `AdminProvinsi` table. All the data in the column will be lost.
  - You are about to drop the column `kodeProvinsi` on the `KabupatenKota` table. All the data in the column will be lost.
  - You are about to drop the column `kodeSatker` on the `PembimbingLapangan` table. All the data in the column will be lost.
  - You are about to drop the column `kodeSatker` on the `PilihanSatker` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `PilihanSatker` table. All the data in the column will be lost.
  - You are about to drop the column `kode` on the `Satker` table. All the data in the column will be lost.
  - You are about to drop the column `kodeKabupatenKota` on the `Satker` table. All the data in the column will be lost.
  - You are about to drop the column `kodeProvinsi` on the `Satker` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provinsiId]` on the table `AdminProvinsi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodeSatker]` on the table `Satker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kabupatenKotaId]` on the table `Satker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tahun]` on the table `TahunAjaran` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provinsiId` to the `AdminProvinsi` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `BimbinganMagang` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `BimbinganMagang` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `DosenPembimbingMagang` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `IzinBimbinganSkripsi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `IzinBimbinganSkripsi` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `provinsiId` to the `KabupatenKota` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `KegiatanHarian` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `KegiatanHarian` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satkerId` to the `PembimbingLapangan` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `PesertaBimbinganMahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `PesertaBimbinganMahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `mahasiswaId` to the `PilihanSatker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satkerId` to the `PilihanSatker` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `PilihanSatker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `PilihanSatker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Presensi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Presensi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `RekapKegiatanBulanan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `RekapKegiatanBulanan` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `kabupatenKotaId` to the `Satker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeSatker` to the `Satker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `povinsiId` to the `Satker` table without a default value. This is not possible if the table is not empty.
  - Made the column `adminProvinsiId` on table `Satker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adminSatkerId` on table `Satker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `TipeKegiatan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `TipeKegiatan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AdminProvinsi" DROP CONSTRAINT "AdminProvinsi_kodeProvinsi_fkey";

-- DropForeignKey
ALTER TABLE "AdminProvinsi" DROP CONSTRAINT "AdminProvinsi_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdminSatker" DROP CONSTRAINT "AdminSatker_userId_fkey";

-- DropForeignKey
ALTER TABLE "BimbinganMagang" DROP CONSTRAINT "BimbinganMagang_dosenId_fkey";

-- DropForeignKey
ALTER TABLE "IzinBimbinganSkripsi" DROP CONSTRAINT "IzinBimbinganSkripsi_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "IzinPresensi" DROP CONSTRAINT "IzinPresensi_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "KabupatenKota" DROP CONSTRAINT "KabupatenKota_kodeProvinsi_fkey";

-- DropForeignKey
ALTER TABLE "KapasitasSatkerTahunAjaran" DROP CONSTRAINT "KapasitasSatkerTahunAjaran_satkerId_fkey";

-- DropForeignKey
ALTER TABLE "KapasitasSatkerTahunAjaran" DROP CONSTRAINT "KapasitasSatkerTahunAjaran_tahunAjaranId_fkey";

-- DropForeignKey
ALTER TABLE "KegiatanHarian" DROP CONSTRAINT "KegiatanHarian_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_dosenId_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_pemlapId_fkey";

-- DropForeignKey
ALTER TABLE "PembimbingLapangan" DROP CONSTRAINT "PembimbingLapangan_kodeSatker_fkey";

-- DropForeignKey
ALTER TABLE "PesertaBimbinganMahasiswa" DROP CONSTRAINT "PesertaBimbinganMahasiswa_bimbinganId_fkey";

-- DropForeignKey
ALTER TABLE "PesertaBimbinganMahasiswa" DROP CONSTRAINT "PesertaBimbinganMahasiswa_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Presensi" DROP CONSTRAINT "Presensi_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "RekapKegiatanBulanan" DROP CONSTRAINT "RekapKegiatanBulanan_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_adminProvinsiId_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_adminSatkerId_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_kodeKabupatenKota_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_kodeProvinsi_fkey";

-- DropForeignKey
ALTER TABLE "TipeKegiatan" DROP CONSTRAINT "TipeKegiatan_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tahunAjaranId_fkey";

-- DropIndex
DROP INDEX "AdminProvinsi_kodeProvinsi_key";

-- DropIndex
DROP INDEX "Provinsi_provinsiId_key";

-- DropIndex
DROP INDEX "Satker_kodeKabupatenKota_key";

-- DropIndex
DROP INDEX "Satker_kode_key";

-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
ALTER TABLE "AdminProvinsi" DROP COLUMN "kodeProvinsi",
ADD COLUMN     "provinsiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BimbinganMagang" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "DosenPembimbingMagang" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "IzinBimbinganSkripsi" ALTER COLUMN "status" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "KabupatenKota" DROP COLUMN "kodeProvinsi",
ADD COLUMN     "provinsiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "KegiatanHarian" ALTER COLUMN "volume" SET DEFAULT 0,
ALTER COLUMN "durasi" SET DEFAULT 0,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "dosenId" DROP NOT NULL,
ALTER COLUMN "pemlapId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PembimbingLapangan" DROP COLUMN "kodeSatker",
ADD COLUMN     "satkerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PesertaBimbinganMahasiswa" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "PilihanSatker" DROP COLUMN "kodeSatker",
DROP COLUMN "nim",
ADD COLUMN     "mahasiswaId" INTEGER NOT NULL,
ADD COLUMN     "satkerId" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Presensi" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "RekapKegiatanBulanan" ALTER COLUMN "target" SET DEFAULT 0,
ALTER COLUMN "realisasi" SET DEFAULT 0,
ALTER COLUMN "persentase" SET DEFAULT 0,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Satker" DROP COLUMN "kode",
DROP COLUMN "kodeKabupatenKota",
DROP COLUMN "kodeProvinsi",
ADD COLUMN     "kabupatenKotaId" INTEGER NOT NULL,
ADD COLUMN     "kodeSatker" TEXT NOT NULL,
ADD COLUMN     "povinsiId" INTEGER NOT NULL,
ALTER COLUMN "adminProvinsiId" SET NOT NULL,
ALTER COLUMN "adminSatkerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TipeKegiatan" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive",
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdminProvinsi_provinsiId_key" ON "AdminProvinsi"("provinsiId");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_kodeSatker_key" ON "Satker"("kodeSatker");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_kabupatenKotaId_key" ON "Satker"("kabupatenKotaId");

-- CreateIndex
CREATE UNIQUE INDEX "TahunAjaran_tahun_key" ON "TahunAjaran"("tahun");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "DosenPembimbingMagang"("dosenId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_pemlapId_fkey" FOREIGN KEY ("pemlapId") REFERENCES "PembimbingLapangan"("pemlapId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProvinsi" ADD CONSTRAINT "AdminProvinsi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProvinsi" ADD CONSTRAINT "AdminProvinsi_provinsiId_fkey" FOREIGN KEY ("provinsiId") REFERENCES "Provinsi"("provinsiId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KabupatenKota" ADD CONSTRAINT "KabupatenKota_provinsiId_fkey" FOREIGN KEY ("provinsiId") REFERENCES "Provinsi"("provinsiId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSatker" ADD CONSTRAINT "AdminSatker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminProvinsiId_fkey" FOREIGN KEY ("adminProvinsiId") REFERENCES "AdminProvinsi"("adminProvinsiId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminSatkerId_fkey" FOREIGN KEY ("adminSatkerId") REFERENCES "AdminSatker"("adminSatkerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_povinsiId_fkey" FOREIGN KEY ("povinsiId") REFERENCES "Provinsi"("provinsiId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_kabupatenKotaId_fkey" FOREIGN KEY ("kabupatenKotaId") REFERENCES "KabupatenKota"("kabupatenKotaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KapasitasSatkerTahunAjaran" ADD CONSTRAINT "KapasitasSatkerTahunAjaran_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KapasitasSatkerTahunAjaran" ADD CONSTRAINT "KapasitasSatkerTahunAjaran_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembimbingLapangan" ADD CONSTRAINT "PembimbingLapangan_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinBimbinganSkripsi" ADD CONSTRAINT "IzinBimbinganSkripsi_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BimbinganMagang" ADD CONSTRAINT "BimbinganMagang_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "DosenPembimbingMagang"("dosenId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesertaBimbinganMahasiswa" ADD CONSTRAINT "PesertaBimbinganMahasiswa_bimbinganId_fkey" FOREIGN KEY ("bimbinganId") REFERENCES "BimbinganMagang"("bimbinganId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesertaBimbinganMahasiswa" ADD CONSTRAINT "PesertaBimbinganMahasiswa_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipeKegiatan" ADD CONSTRAINT "TipeKegiatan_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanHarian" ADD CONSTRAINT "KegiatanHarian_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapKegiatanBulanan" ADD CONSTRAINT "RekapKegiatanBulanan_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinPresensi" ADD CONSTRAINT "IzinPresensi_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;
