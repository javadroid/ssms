import { Module } from '@nestjs/common';
import { PolicyInfoService } from './policy-info.service';
import { PolicyInfoController } from './policy-info.controller';
import { PolicyInfo, PolicyInfoSchema } from '../../schema/policyInfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: PolicyInfo.name, schema: PolicyInfoSchema }])],
  providers: [PolicyInfoService],
  controllers: [PolicyInfoController]
})
export class PolicyInfoModule {}
