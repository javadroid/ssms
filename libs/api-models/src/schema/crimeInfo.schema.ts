import{
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument, } from 'mongoose';

export type CrimeInfoDoc = HydratedDocument<CrimeInfo>;

@Schema ({ timestamps:true })
export class CrimeInfo {
    @Prop()
    crimeId: string;
    @Prop()
    personnelId: string;
    @Prop()
    weaponId: string;
    @Prop()
    crimeCategory: string;
    @Prop()
    crimeType: string;
    @Prop()
    crimeDate: string;
    @Prop()
    crimeTime: string;
    @Prop()
    statementOfOffense: string;
    @Prop()
    incidentId: string;
    @Prop()
    evidence: Evidence[];
    @Prop()
    criminalId: string[];
    @Prop()
    motive: string;
    @Prop()
    victimId: string[];
    @Prop()
    vehicleId: string;
    @Prop()
    reportId: string;
    @Prop()
    locationId: string;
}

class Evidence {
  @Prop()
  type: string;
  @Prop()
  vehicleId: string;
  @Prop()
  brand: string;
  @Prop()
  license: string;
  @Prop()
  modelNo: string;
  @Prop()
  file: string;
}

export const CrimeInfoSchema = SchemaFactory.createForClass(CrimeInfo);
