-- DropForeignKey
ALTER TABLE "AdminSatker" DROP CONSTRAINT "AdminSatker_satkerId_fkey";

-- AddForeignKey
ALTER TABLE "AdminSatker" ADD CONSTRAINT "AdminSatker_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE SET NULL ON UPDATE CASCADE;
