import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path, { format } from 'path';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@Injectable()
export class VideoService {
  private outputPath: string = path.join(process.cwd(), 'uploads', 'converted');

  constructor(private db: PrismaService) {}

  async createVideo(dto: CreateVideoDto, file: Express.Multer.File) {
    const newVideo = await this.db.prisma.video.create({ data: dto });
    const videoFormats = await this.convertVideo(file);
    const formats = await this.db.prisma.videoFormats.createManyAndReturn({
      data: videoFormats.map((e) => ({ ...e, videoId: newVideo.id })),
    });

    return { ...newVideo, formats };
  }

  async convertVideo(file: Express.Multer.File): Promise<any> {
    const inputPath = file.path;
    const fileName = path.parse(file.filename).name;

    const resolutions = [
      { label: '360p', size: '640x360' },
      { label: '480p', size: '854x480' },
      { label: '720p', size: '1280x720' },
      { label: '1080p', size: '1920x1080' },
    ];

    const promises = resolutions.map(({ label, size }) => {
      const videoOutputPath = path.join(
        this.outputPath,
        `${fileName}_${label}.mp4`,
      );
      return new Promise((res, rej) => {
        ffmpeg(inputPath)
          .size(size)
          .toFormat('mp4')
          .on('end', () => res({ label, path: videoOutputPath }))
          .on('error', (err) => rej(`Error (${label}): ${err.message}`))
          .save(videoOutputPath);
      });
    });

    try {
      return await Promise.all(promises);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOneVideo(id: string) {
    try {
      return await this.db.prisma.video.findFirstOrThrow({
        where: { id },
        select: {
          formats: true,
          name: true,
          id: true,
        },
      });
    } catch (error) {
      throw new NotFoundException('Video not found');
    }
  }

  async getVideos() {
    try {
      return await this.db.prisma.video.findMany({
        select: {
          formats: true,
          name: true,
          id: true,
          _count: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getVideoWithQuery(id: string, query: string) {
    try {
      return await this.db.prisma.videoFormats.findFirstOrThrow({ where: { videoId: id, label: query } });
    } catch (error) {
      throw new NotFoundException('Video not found');
    }
  }
}
