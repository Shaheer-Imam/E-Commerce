import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User',
      schema: UserSchema}])
  ],
  providers: [UserService],
  exports: [UserService],
})
export class SharedModule {}
