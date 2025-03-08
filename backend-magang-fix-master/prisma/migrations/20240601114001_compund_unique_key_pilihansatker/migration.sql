/*
  Warnings:

  - A unique constraint covering the columns `[mahasiswaId,satkerId]` on the table `PilihanSatker` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PilihanSatker" ALTER COLUMN "isActive" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "PilihanSatker_mahasiswaId_satkerId_key" ON "PilihanSatker"("mahasiswaId", "satkerId");
