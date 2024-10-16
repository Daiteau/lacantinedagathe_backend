import { Module } from '@nestjs/common';
import { ContentService } from './contents.service';
import { ContentsController } from './contents.controller';

@Module({
  providers: [ContentService],
  controllers: [ContentsController]
})
export class ContentModule {}
