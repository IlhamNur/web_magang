/*
  Warnings:

  - You are about to drop the column `nomorKelompok` on the `BimbinganMagang` table. All the data in the column will be lost.
  - You are about to drop the column `nipDosen` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the column `nipPemlap` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the column `kapasitas` on the `Satker` table. All the data in the column will be lost.
  - You are about to drop the `PesertaBimbinganMagang` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dosenId` to the `BimbinganMagang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dosenId` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pemlapId` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_nipDosen_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_nipPemlap_fkey";

-- DropForeignKey
ALTER TABLE "PesertaBimbinganMagang" DROP CONSTRAINT "PesertaBimbinganMagang_bimbinganId_fkey";

-- DropForeignKey
ALTER TABLE "PesertaBimbinganMagang" DROP CONSTRAINT "PesertaBimbinganMagang_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "PesertaBimbinganMagang" DROP CONSTRAINT "PesertaBimbinganMagang_nipDosen_fkey";

-- DropIndex
DROP INDEX "DosenPembimbingMagang_nip_key";

-- DropIndex
DROP INDEX "KabupatenKota_nama_key";

-- DropIndex
DROP INDEX "PembimbingLapangan_nip_key";

-- DropIndex
DROP INDEX "Provinsi_nama_key";

-- DropIndex
DROP INDEX "Satker_satkerId_key";

-- AlterTable
ALTER TABLE "BimbinganMagang" DROP COLUMN "nomorKelompok",
ADD COLUMN     "dosenId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "nipDosen",
DROP COLUMN "nipPemlap",
ADD COLUMN     "dosenId" INTEGER NOT NULL,
ADD COLUMN     "pemlapId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Satker" DROP COLUMN "kapasitas";

-- DropTable
DROP TABLE "PesertaBimbinganMagang";

-- CreateTable
CREATE TABLE "KapasitasSatkerTahunAjaran" (
    "kapasitasId" SERIAL NOT NULL,
    "satkerId" INTEGER NOT NULL,
    "tahunAjaranId" INTEGER NOT NULL,
    "kapasitas" INTEGER,

    CONSTRAINT "KapasitasSatkerTahunAjaran_pkey" PRIMARY KEY ("kapasitasId")
);

-- CreateTable
CREATE TABLE "PesertaBimbinganMahasiswa" (
    "pesertaBimbinganMagangId" SERIAL NOT NULL,
    "bimbinganId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PesertaBimbinganMahasiswa_pkey" PRIMARY KEY ("pesertaBimbinganMagangId")
);

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "DosenPembimbingMagang"("dosenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_pemlapId_fkey" FOREIGN KEY ("pemlapId") REFERENCES "PembimbingLapangan"("pemlapId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KapasitasSatkerTahunAjaran" ADD CONSTRAINT "KapasitasSatkerTahunAjaran_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KapasitasSatkerTahunAjaran" ADD CONSTRAINT "KapasitasSatkerTahunAjaran_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BimbinganMagang" ADD CONSTRAINT "BimbinganMagang_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "DosenPembimbingMagang"("dosenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesertaBimbinganMahasiswa" ADD CONSTRAINT "PesertaBimbinganMahasiswa_bimbinganId_fkey" FOREIGN KEY ("bimbinganId") REFERENCES "BimbinganMagang"("bimbinganId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesertaBimbinganMahasiswa" ADD CONSTRAINT "PesertaBimbinganMahasiswa_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE RESTRICT ON UPDATE CASCADE;
