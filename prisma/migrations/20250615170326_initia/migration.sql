/*
  Warnings:

  - You are about to drop the `VideoFormats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VideoFormats" DROP CONSTRAINT "VideoFormats_video_id_fkey";

-- DropTable
DROP TABLE "VideoFormats";

-- CreateTable
CREATE TABLE "video_formats" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,

    CONSTRAINT "video_formats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "video_formats" ADD CONSTRAINT "video_formats_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
