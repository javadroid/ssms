import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { Policy, PolicySchema } from '../../schema/policy.schema';
import { PolicyController } from './policy.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Policy.name, schema: PolicySchema }])],
  controllers: [PolicyController],
  providers: [PolicyService]
})
export class PolicyModule {}
