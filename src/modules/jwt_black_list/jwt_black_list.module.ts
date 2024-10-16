import { Module } from '@nestjs/common';
import { JwtBlackListService } from './jwt_black_list.service';
import { JwtBlackListController } from './jwt_black_list.controller';

@Module({
  providers: [JwtBlackListService],
  controllers: [JwtBlackListController]
})
export class JwtBlackListModule {}
