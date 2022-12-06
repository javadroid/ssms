import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Organizationcategory, OrganizationcategorySchema } from '../../schema/organizationcategory.schema';
import { OrganizationcategoryController } from './organizationcategory.controller';
import { OrganizationcategoryService } from './organizationcategory.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: Organizationcategory.name, schema: OrganizationcategorySchema }])],
  controllers:[OrganizationcategoryController],
  providers:[OrganizationcategoryService]
})
export class OrganizationcategoryModule {}
