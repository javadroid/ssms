import{
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { Date, HydratedDocument, } from 'mongoose';

export type CriminalInfoDoc = HydratedDocument<CriminalInfo>;

@Schema ({ timestamps:true })
export class CriminalInfo {
    @Prop()
    dateOfBirth: string;
    @Prop()
    caseId: string[];
    @Prop()
    victimId: string[];
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    middleName: string;
    @Prop()
    occupation: string;
    @Prop()
    nin: string;
    @Prop()
    gender: string;
    @Prop()
    email: string;
    @Prop()
    phone: string;
    @Prop()
    birthPlace: string;
    @Prop()
    image: string;
    @Prop()
    height: string;
    @Prop()
    weight: string;
    @Prop()
    eyeColor: string;
    @Prop()
    hairColor: string;
    @Prop()
    address: string;
    @Prop()
    biometrics: string;
    @Prop()
    lga: string;
    @Prop()
    state: string;
    @Prop()
    country: string;
    @Prop()
    lgaOfOrigin: string;
    @Prop()
    stateOfOrigin: string;
    @Prop()
    countryOfOrigin: string;
    @Prop()
    postalCode: string;
    @Prop({default: '!ALLOW'})
    updated:string

    @Prop()
    education:string
    @Prop()
    alias:string

}
export const CriminalInfoSchema = SchemaFactory.createForClass(CriminalInfo);
