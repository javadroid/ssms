import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';

  export type VictimInfoDoc = HydratedDocument<VictimInfo>;

  @Schema({ timestamps: true })
export class VictimInfo {
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    address: string;
    @Prop()
    dateOfBirth: string;
    @Prop()
    age: string;
    @Prop()
    occupation: string;
    @Prop()
    nin: string;
    @Prop()
    locationId: string;
    
}

export const victimInfoSchema = SchemaFactory.createForClass(VictimInfo);
