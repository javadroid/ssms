import { Module } from '@nestjs/common';
import { Department, DepartmentSchema } from '../../schema/department.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';


@Module({
  imports:[MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }])],
  controllers:[DepartmentController],
  providers:[DepartmentService]
})
export class DepartmentModule {}
