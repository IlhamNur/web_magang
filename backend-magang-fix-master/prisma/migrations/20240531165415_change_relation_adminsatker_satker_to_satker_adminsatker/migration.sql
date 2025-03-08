/*
  Warnings:

  - You are about to drop the column `adminSatkerId` on the `Satker` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[satkerId]` on the table `AdminSatker` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_adminSatkerId_fkey";

-- DropIndex
DROP INDEX "Satker_adminSatkerId_key";

-- AlterTable
ALTER TABLE "AdminSatker" ADD COLUMN     "satkerId" INTEGER;

-- AlterTable
ALTER TABLE "Satker" DROP COLUMN "adminSatkerId";

-- CreateIndex
CREATE UNIQUE INDEX "AdminSatker_satkerId_key" ON "AdminSatker"("satkerId");

-- AddForeignKey
ALTER TABLE "AdminSatker" ADD CONSTRAINT "AdminSatker_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE SET NULL ON UPDATE CASCADE;
