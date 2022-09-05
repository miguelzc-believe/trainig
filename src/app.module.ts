import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { LikesService } from './likes/likes.service';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule, AuthModule, LikesModule],
  controllers: [AppController],
  providers: [AppService, LikesService],
})
export class AppModule {}
