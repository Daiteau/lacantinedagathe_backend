import { Test, TestingModule } from '@nestjs/testing';
import { JwtBlackListController } from './jwt_black_list.controller';

describe('JwtBlackListController', () => {
  let controller: JwtBlackListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwtBlackListController],
    }).compile();

    controller = module.get<JwtBlackListController>(JwtBlackListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
