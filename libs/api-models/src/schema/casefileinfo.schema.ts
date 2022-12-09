import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';
  
    export type CaseFileInfoDoc = HydratedDocument<CaseFileInfo>;

@Schema({ timestamps: true })
export class CaseFileInfo {
    @Prop()
    crimeId: string;
    @Prop()
    criminalId: string;
    @Prop()
    crimeCategory: string;
    @Prop()
    dateOfReport:string;
    @Prop()
    division:string;
    @Prop()
    personnelId:string;
    @Prop()
    progressStatus:string;
    @Prop()
    victimId:string;
    @Prop()
    incidentId:string;
}

export const CaseFileInfoSchema = SchemaFactory.createForClass(CaseFileInfo);

