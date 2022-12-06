import { Module } from '@nestjs/common';
import { Branch, BranchSchema } from '../../schema/branch.schema';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }])],
  controllers: [BranchController],
  providers: [BranchService]
})
export class BranchModule {}
