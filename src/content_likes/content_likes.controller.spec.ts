import { Test, TestingModule } from '@nestjs/testing';
import { ContentLikesController } from './content_likes.controller';

describe('ContentLikesController', () => {
  let controller: ContentLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentLikesController],
    }).compile();

    controller = module.get<ContentLikesController>(ContentLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
