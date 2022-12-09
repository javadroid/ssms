import{
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument, } from 'mongoose';

export type CriminalInfoDoc = HydratedDocument<CriminalInfo>;

@Schema ({ timestamps:true })
export class CriminalInfo {
    @Prop()
    criminalId: string;
    @Prop()
    crimeId: string;
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    MiddleNameName: string;
    @Prop()
    phoneNumber: string;
    @Prop()
    dateOfBirth: string;
    @Prop()
    placeOfBirth: string;
    @Prop()
    stateOfOrigin: string;
    @Prop()
    lgaOfOrigin: string;
    @Prop()
    occupation: string;
    @Prop()
    address: string;
    @Prop()
    education: string;
    @Prop()
    biometrics: string;
    @Prop()
    profilePic: string;
    @Prop()
    nin: string;
    @Prop()
    height: string;
    @Prop()
    weight: string;
    @Prop()
    aliases: string;
}
export const CriminalInfoSchema = SchemaFactory.createForClass(CriminalInfo);