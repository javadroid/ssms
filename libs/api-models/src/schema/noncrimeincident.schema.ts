
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
  info: string;
  @Prop()
  locationId: string;
  @Prop()
  reportersId: string;
  @Prop()
  reportId: string;
  @Prop()
  crimeId: string

}

export const NonCrimeIncidentSchema = SchemaFactory.createForClass(NonCrimeIncident);

