/*
  Warnings:

  - Added the required column `path` to the `video_formats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "video_formats" ADD COLUMN     "path" TEXT NOT NULL;
