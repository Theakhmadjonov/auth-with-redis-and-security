import { Injectable } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@Injectable()
export class VideoService {
  constructor() {}

  async convertVideo(file: Express.Multer.File) {
    const inputPath = file.path;
    const fileName = path.parse(file.filename).name;

    const resolutions = [
      { label: '360p', size: '640x360' },
      { label: '480p', size: '854x480' },
      { label: '720p', size: '1280x720' },
      { label: '1080p', size: '1920x1080' },
    ];

    const promises = resolutions.map(({ label, size }) => {
      const outputPath = `converted/${fileName}_${label}.mp4`;
      return new Promise((res, rej) => {
        ffmpeg(inputPath)
          .size(size)
          .toFormat('mp4')
          .on('end', () => res({ label, path: outputPath }))
          .on('error', (err) => rej(`Error (${label}): ${err.message}`))
          .save(outputPath);
      });
    });

    try {
      const results = await Promise.all(promises);
      return {
        message: 'All resolutions converted successfully (mp4 only)',
        original: inputPath,
        outputs: results,
      };
    } catch (error) {
      return {
        message: 'Conversion failed',
        error: error,
      };
    }
  }
}
