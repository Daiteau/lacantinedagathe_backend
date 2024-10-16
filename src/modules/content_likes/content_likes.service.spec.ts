import { Test, TestingModule } from '@nestjs/testing';
import { ContentLikesService } from './content_likes.service';

describe('ContentLikesService', () => {
  let service: ContentLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentLikesService],
    }).compile();

    service = module.get<ContentLikesService>(ContentLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
