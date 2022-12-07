import { Module } from '@nestjs/common';
import { NonCrimeIncidentController } from './non-crime-incident.controller';
import { NonCrimeIncidentService } from './non-crime-incident.service';
import { NonCrimeIncident, NonCrimeIncidentSchema } from '../../schema/noncrimeincident.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: NonCrimeIncident.name, schema: NonCrimeIncidentSchema}])],
  controllers: [NonCrimeIncidentController],
  providers: [NonCrimeIncidentService]
})
export class NonCrimeIncidentModule {}
