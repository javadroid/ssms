import { Module } from '@nestjs/common';
import { OrganizationnameService } from './organizationname.service';
import { OrganizationnameController } from './organizationname.controller';

@Module({
  providers: [OrganizationnameService],
  controllers: [OrganizationnameController]
})
export class OrganizationnameModule {}
