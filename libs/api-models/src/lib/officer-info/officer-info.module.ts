import { Module } from '@nestjs/common';
import { officeInfo, officeInfoSchema } from '../../schema/officerInfo.schema';
import { OfficerInfoController } from './officer-info.controller';
import { OfficerInfoService } from './officer-info.service';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports:[MongooseModule.forFeature([{ name: officeInfo.name, schema: officeInfoSchema }])],
  controllers: [OfficerInfoController],
  providers: [OfficerInfoService]
})
export class OfficerInfoModule {}
