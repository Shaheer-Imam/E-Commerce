import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [SharedModule],
})
export class AuthModule {}
