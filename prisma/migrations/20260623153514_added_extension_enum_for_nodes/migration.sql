/*
  Warnings:

  - The `ext` column on the `Node` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Extension" AS ENUM ('JPG', 'JPEG', 'PNG', 'GIF', 'MP4', 'MP3', 'PDF', 'DOCS', 'XLSX', 'TXT', 'ZIP', 'CSV');

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "ext",
ADD COLUMN     "ext" "Extension";
