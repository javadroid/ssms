import { Module } from '@nestjs/common';
import { divisionInfo, divisionInfoSchema } from '../../schema/divisionInfo.schema';
import { DivisionInfoController } from './division-info.controller';
import { DivisionInfoService } from './division-info.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[MongooseModule.forFeature([{ name: divisionInfo.name, schema: divisionInfoSchema }])],
  providers: [DivisionInfoService],
  controllers: [DivisionInfoController]
})
export class DivisionInfoModule {}
