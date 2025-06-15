import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [AuthModule, CoreModule, UsersModule, MoviesModule, VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
