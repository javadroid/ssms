import { Module } from '@nestjs/common';
import { CriminalInfoService } from './criminal-info.service';
import { CriminalInfoController } from './criminal-info.controller';
import { CriminalInfo, CriminalInfoSchema } from '../../schema/criminalInfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: CriminalInfo.name, schema: CriminalInfoSchema}])],
  providers: [CriminalInfoService],
  controllers:[CriminalInfoController]
})
export class CriminalInfoModule {}
