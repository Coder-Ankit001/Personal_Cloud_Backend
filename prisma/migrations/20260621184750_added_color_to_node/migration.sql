/*
  Warnings:

  - Added the required column `color` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('blue', 'emerald', 'rose', 'gray', 'violet', 'amber', 'sky', 'pink', 'teal', 'orange');

-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "color" TEXT NOT NULL;
