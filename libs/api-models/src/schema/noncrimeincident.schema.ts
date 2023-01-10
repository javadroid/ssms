
import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import  { HydratedDocument,  } from 'mongoose';


export type NonCrimeIncidentDoc = HydratedDocument<NonCrimeIncident>;

@Schema({ timestamps: true })
export class NonCrimeIncident {
    @Prop()
    details:string;
    @Prop()
    locationId:string;
    @Prop()
    reportId: string;
    @Prop()
    date: string;
    @Prop()
    time: string;
    @Prop()
    title: string;
    @Prop()
    crimeId:string;
    @Prop()
    evidence: string;

}

export const NonCrimeIncidentSchema = SchemaFactory.createForClass(NonCrimeIncident);

