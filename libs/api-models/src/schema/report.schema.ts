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
    title: string
    @Prop()
    details: string
    @Prop()
    location: string
    @Prop()
    state: string
    @Prop()
    media:[]
    @Prop()
    reportType:[]
    @Prop()
    lga: string
    @Prop()
    phone: string
    @Prop()
    email: string
    @Prop()
    GPSlocation: []
    @Prop()
    personnel: string
    @Prop()
    organization: string



}

export const ReportSchema = SchemaFactory.createForClass(Report);


