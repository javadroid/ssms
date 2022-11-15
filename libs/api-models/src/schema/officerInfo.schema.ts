import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';
  
  
  export type officerInfoDoc = HydratedDocument<officeInfo>;

@Schema({ timestamps: true })
export class officeInfo {
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    divisionId: string;
    @Prop()
    stationId: string;
    @Prop()
    divisionName: string;
    @Prop()
    stationAddress: string;
    @Prop()
    rank: string;
    @Prop()
    actions: string;
    @Prop()
    policyId: string;
    @Prop()
    nin: string;
    @Prop()
    officerType: string;
 
}

export const officeInfoSchema = SchemaFactory.createForClass(officeInfo);
