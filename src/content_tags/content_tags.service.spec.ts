import { Test, TestingModule } from '@nestjs/testing';
import { ContentTagsService } from './content_tags.service';

describe('ContentTagsService', () => {
  let service: ContentTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentTagsService],
    }).compile();

    service = module.get<ContentTagsService>(ContentTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
