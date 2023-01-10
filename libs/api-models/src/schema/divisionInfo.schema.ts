import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';


  export type DivisionInfoDoc = HydratedDocument<divisionInfo>;

@Schema({ timestamps: true })
export class divisionInfo {
    @Prop()
    divisionName: string;
    @Prop()
    dpoName: string;
    @Prop()
    officeName: string;
    @Prop()
    officerId: string;
    @Prop()
    address: string;
    @Prop()
    rank: string;
    @Prop()
    caseFileId: string;
    @Prop()
    subscriberId: string;

}

export const divisionInfoSchema = SchemaFactory.createForClass(divisionInfo);
