import { Module } from '@nestjs/common';
import { ContentLikesController } from './content_likes.controller';
import { ContentLikesService } from './content_likes.service';

@Module({
  controllers: [ContentLikesController],
  providers: [ContentLikesService]
})
export class ContentLikesModule {}
