/*
  Warnings:

  - You are about to drop the column `publicId` on the `SchoolGallery` table. All the data in the column will be lost.
  - You are about to drop the column `resourceType` on the `SchoolGallery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SchoolGallery" DROP COLUMN "publicId",
DROP COLUMN "resourceType";
