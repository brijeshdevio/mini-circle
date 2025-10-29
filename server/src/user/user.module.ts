import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '@/schema/user.schema';
import { PostModule } from '@/post/post.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    PostModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
