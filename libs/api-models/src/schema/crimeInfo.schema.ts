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
    officerId: string;
    @Prop()
    securityAppId: string;
    @Prop()
    weaponId: string;
    @Prop()
    crimeCategory: string;
    @Prop()
    crimeDate: string;
    @Prop()
    crimeTime: string;
    @Prop()
    statementOfOffense: string;
    @Prop()
    incidentId: string;
    @Prop()
    crimeEvidence: string;
    @Prop()
    policyId: string;
    @Prop()
    progressStatus: string;
    @Prop()
    criminalId: string;
    @Prop()
    motive: string;
    @Prop()
    victimId: string;
    @Prop()
    vehicleId: string;
    @Prop()
    reportId: string;
    @Prop()
    locationId: string;
}
export const CrimeInfoSchema = SchemaFactory.createForClass(CrimeInfo);