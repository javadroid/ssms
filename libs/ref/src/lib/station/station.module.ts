import { Module } from '@nestjs/common';
import { StationController } from './station.controller';
import { StationService, } from './station.service';
import { Station, StationSchema } from '../../schema/station.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }])],
  controllers: [StationController],
  providers: [StationService]
})
export class StationModule {}
