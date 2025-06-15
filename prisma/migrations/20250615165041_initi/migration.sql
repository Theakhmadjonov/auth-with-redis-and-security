-- CreateTable
CREATE TABLE "VideoFormats" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,

    CONSTRAINT "VideoFormats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoFormats" ADD CONSTRAINT "VideoFormats_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
