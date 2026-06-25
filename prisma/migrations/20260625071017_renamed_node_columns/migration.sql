/*
  Warnings:

  - You are about to drop the column `mimeType` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `storageKey` on the `Node` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Node" DROP COLUMN "mimeType",
DROP COLUMN "storageKey",
ADD COLUMN     "contentType" TEXT,
ADD COLUMN     "storagePath" TEXT;
