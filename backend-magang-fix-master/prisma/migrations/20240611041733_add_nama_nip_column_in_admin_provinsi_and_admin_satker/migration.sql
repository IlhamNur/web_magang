/*
  Warnings:

  - Added the required column `nama` to the `AdminProvinsi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip` to the `AdminProvinsi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `AdminSatker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip` to the `AdminSatker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminProvinsi" ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "nip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AdminSatker" ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "nip" TEXT NOT NULL;
