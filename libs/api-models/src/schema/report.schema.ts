import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';


  export type ReportDoc = HydratedDocument<Report>;

@Schema({ timestamps: true })
export class Report {
    @Prop()
    state: string;
    @Prop()
    crimeId: string;
    @Prop()
    policy: string;
    @Prop()
    crimeCategory: string;




}

export const ReportSchema = SchemaFactory.createForClass(Report);


