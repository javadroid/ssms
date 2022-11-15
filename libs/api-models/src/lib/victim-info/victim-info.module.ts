import { Module } from '@nestjs/common';
import { VictimInfo, victimInfoSchema } from '../../schema/victimInfo.schema';
import { VictimInfoController } from './victim-info.controller';
import { VictimInfoService } from './victim-info.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: VictimInfo.name, schema: victimInfoSchema }])],
  controllers: [VictimInfoController],
  providers: [VictimInfoService]
})
export class VictimInfoModule {}
