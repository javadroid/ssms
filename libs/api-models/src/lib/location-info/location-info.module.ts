import { Module } from '@nestjs/common';
import { LocationInfoController } from './location-info.controller';
import { LocationInfoService } from './location-info.service';
import { LocationInfo, LocationInfoSchema } from '../../schema/locationinfo.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports:[MongooseModule.forFeature([{ name: LocationInfo.name, schema: LocationInfoSchema}])],
  controllers: [LocationInfoController],
  providers: [LocationInfoService]

})
export class LocationInfoModule {

}
