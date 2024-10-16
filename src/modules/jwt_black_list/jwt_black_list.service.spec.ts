import { Test, TestingModule } from '@nestjs/testing';
import { JwtBlackListService } from './jwt_black_list.service';

describe('JwtBlackListService', () => {
  let service: JwtBlackListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtBlackListService],
    }).compile();

    service = module.get<JwtBlackListService>(JwtBlackListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
