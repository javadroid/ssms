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
    location: string;
    @Prop()
    title:string;
    @Prop()
    reportCategory: string;
    @Prop()
    reportType:string;
    @Prop()
    details:string;
    

}

export const ReportSchema = SchemaFactory.createForClass(Report);


