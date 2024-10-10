import { Test, TestingModule } from '@nestjs/testing';
import { ContentPicturesController } from './content_pictures.controller';

describe('ContentPicturesController', () => {
  let controller: ContentPicturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentPicturesController],
    }).compile();

    controller = module.get<ContentPicturesController>(ContentPicturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
