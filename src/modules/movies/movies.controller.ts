import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileUploadInterceptor } from 'src/interceptors/file-upload.interceptor';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

}
