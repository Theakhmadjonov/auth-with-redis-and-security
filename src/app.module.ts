import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, CoreModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
