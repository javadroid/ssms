import { Module } from '@nestjs/common';
import { OrganizationnameService } from './organizationname.service';
import { OrganizationnameController } from './organizationname.controller';
import { Organizationname, OrganizationnameSchema } from '../../schema/organizationname.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Organizationname.name, schema: OrganizationnameSchema }])],
  providers: [OrganizationnameService],
  controllers: [OrganizationnameController]
})
export class OrganizationnameModule {}
