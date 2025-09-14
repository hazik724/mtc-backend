/*
  Warnings:

  - You are about to drop the column `careerId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the `Career` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Application" DROP CONSTRAINT "Application_careerId_fkey";

-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "careerId";

-- DropTable
DROP TABLE "public"."Career";
