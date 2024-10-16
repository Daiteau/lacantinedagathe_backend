import { Test, TestingModule } from '@nestjs/testing';
import { ContentPicturesService } from './content_pictures.service';

describe('ContentPicturesService', () => {
  let service: ContentPicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentPicturesService],
    }).compile();

    service = module.get<ContentPicturesService>(ContentPicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
