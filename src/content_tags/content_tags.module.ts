import { Module } from '@nestjs/common';
import { ContentTagsController } from './content_tags.controller';
import { ContentTagsService } from './content_tags.service';

@Module({
  controllers: [ContentTagsController],
  providers: [ContentTagsService]
})
export class ContentTagsModule {}
