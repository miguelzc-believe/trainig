import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [PostModule]
})
export class LikesModule {}
