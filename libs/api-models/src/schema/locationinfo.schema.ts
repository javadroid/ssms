import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';
  
  
  export type LocationInfoDoc = HydratedDocument<LocationInfo>;

@Schema({ timestamps: true })
export class LocationInfo {
    @Prop()
    state: string;
    @Prop()
    lga: string;
    @Prop()
    town: string;
    @Prop()
    streetNameNumber: string;
    @Prop()
    zipCode: string;
    @Prop()
    coordinates: string
 
}

export const LocationInfoSchema = SchemaFactory.createForClass(LocationInfo);


