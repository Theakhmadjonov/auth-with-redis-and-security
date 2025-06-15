import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { FileUploadInterceptor } from 'src/interceptors/file-upload.interceptor';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('movies')
export class VideosController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/video/upload')
  @UseInterceptors(FileUploadInterceptor)
  async uploadVideo(@Body() createVideoDto: CreateVideoDto) {

  }
}


