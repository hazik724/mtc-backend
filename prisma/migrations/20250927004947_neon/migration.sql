/*
  Warnings:

  - You are about to drop the column `type` on the `SchoolGallery` table. All the data in the column will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `SchoolGallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."SchoolGallery" DROP COLUMN "type",
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Job";

-- CreateTable
CREATE TABLE "public"."job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);
