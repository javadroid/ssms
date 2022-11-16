import { Module } from '@nestjs/common';
import { SecurityApparatusController } from './security-apparatus.controller';
import { SecurityApparatusService } from './security-apparatus.service';
import { SecurityApparatus, SecurityApparatusSchema } from '../../schema/securityapparatus.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports:[MongooseModule.forFeature([{ name: SecurityApparatus.name, schema: SecurityApparatusSchema}])],
  controllers: [SecurityApparatusController],
  providers: [SecurityApparatusService]
})
export class SecurityApparatusModule {}
