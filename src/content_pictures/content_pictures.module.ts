import { Module } from '@nestjs/common';
import { ContentPicturesController } from './content_pictures.controller';
import { ContentPicturesService } from './content_pictures.service';

@Module({
  controllers: [ContentPicturesController],
  providers: [ContentPicturesService]
})
export class ContentPicturesModule {}
