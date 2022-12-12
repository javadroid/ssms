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
    personnelId: [];
    @Prop()
    weapon: [];
    @Prop()
    crimeCategory: string;
    @Prop()
    crimeType:string;
    @Prop()
    crimeDate: string;
    @Prop()
    crimeTime: string;
    @Prop()
    statementOfOffense: string;
    @Prop()
    incidentId: [];
    @Prop()
    evidence: [];
    @Prop()
    policy: [];
    @Prop()
    progressStatus: string;
    @Prop()
    criminalId: [];
    @Prop()
    motive: string;
    @Prop()
    victimId: [];
    @Prop()
    vehicleId: [];
    @Prop()
    reportId: [];
    @Prop()
    locationId: [];

}
export const CrimeInfoSchema = SchemaFactory.createForClass(CrimeInfo);

