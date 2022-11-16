import { Module } from '@nestjs/common';
import { CaseFileInfoController } from './case-file-info.controller';
import { CaseFileInfoService } from './case-file-info.service';
import { CaseFileInfo, CaseFileInfoSchema } from '../../schema/casefileinfo.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports:[MongooseModule.forFeature([{ name: CaseFileInfo.name, schema: CaseFileInfoSchema}])],
  controllers: [CaseFileInfoController],
  providers: [CaseFileInfoService]
})
export class CaseFileInfoModule {}
