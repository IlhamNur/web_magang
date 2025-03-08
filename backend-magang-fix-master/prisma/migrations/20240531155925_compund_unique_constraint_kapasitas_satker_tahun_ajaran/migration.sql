/*
  Warnings:

  - A unique constraint covering the columns `[satkerId,tahunAjaranId]` on the table `KapasitasSatkerTahunAjaran` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KapasitasSatkerTahunAjaran_satkerId_tahunAjaranId_key" ON "KapasitasSatkerTahunAjaran"("satkerId", "tahunAjaranId");
