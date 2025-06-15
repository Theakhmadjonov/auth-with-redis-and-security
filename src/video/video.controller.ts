import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileUploadInterceptor } from 'src/interceptors/file-upload.interceptor';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import ffmeg from 'fluent-ffmpeg';
@Controller('movies')
export class VideosController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/video/upload')
  @UseInterceptors(FileUploadInterceptor)
  async uploadVideo(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return await this.videoService.convertVideo(file);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
