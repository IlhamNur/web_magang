/*
  Warnings:

  - You are about to drop the `UserTahunAjaran` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tahunAjaranId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTahunAjaran" DROP CONSTRAINT "UserTahunAjaran_tahunAjaranId_fkey";

-- DropForeignKey
ALTER TABLE "UserTahunAjaran" DROP CONSTRAINT "UserTahunAjaran_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tahunAjaranId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserTahunAjaran";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE RESTRICT ON UPDATE CASCADE;
