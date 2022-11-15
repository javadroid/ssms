import { Module } from '@nestjs/common';
import { VictimInfoController } from './victim-info.controller';
import { VictimInfoService } from './victim-info.service';

@Module({
  controllers: [VictimInfoController],
  providers: [VictimInfoService]
})
export class VictimInfoModule {}
