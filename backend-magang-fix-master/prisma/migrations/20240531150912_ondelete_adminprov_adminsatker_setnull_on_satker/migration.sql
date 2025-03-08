-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_adminProvinsiId_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_adminSatkerId_fkey";

-- AlterTable
ALTER TABLE "Satker" ALTER COLUMN "adminProvinsiId" DROP NOT NULL,
ALTER COLUMN "adminSatkerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminProvinsiId_fkey" FOREIGN KEY ("adminProvinsiId") REFERENCES "AdminProvinsi"("adminProvinsiId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminSatkerId_fkey" FOREIGN KEY ("adminSatkerId") REFERENCES "AdminSatker"("adminSatkerId") ON DELETE SET NULL ON UPDATE CASCADE;
