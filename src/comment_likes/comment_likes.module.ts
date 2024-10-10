import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment_likes.service';
import { CommentLikesController } from './comment_likes.controller';

@Module({
  providers: [CommentLikesService],
  controllers: [CommentLikesController]
})
export class CommentLikesModule {}
