import { Test, TestingModule } from '@nestjs/testing';
import { ContentTagsController } from './content_tags.controller';

describe('ContentTagsController', () => {
  let controller: ContentTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentTagsController],
    }).compile();

    controller = module.get<ContentTagsController>(ContentTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
