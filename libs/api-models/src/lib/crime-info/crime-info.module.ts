import { Module } from '@nestjs/common';
import { CrimeInfoService } from './crime-info.service';
import { CrimeInfoController } from './crime-info.controller';
import { CrimeInfo, CrimeInfoSchema } from '../../schema/crimeInfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: CrimeInfo.name, schema: CrimeInfoSchema}])],
  providers: [CrimeInfoService],
  controllers:[CrimeInfoController]
})
export class CrimeInfoModule {}
