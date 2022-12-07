import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';
  
    export type SecurityApparatusDoc = HydratedDocument<SecurityApparatus>;

@Schema({ timestamps: true })
export class SecurityApparatus {
    @Prop()
    securityAppName: string;
    @Prop()
    securityAppType: string;
    @Prop()
    jurisdiction: string;
    @Prop()
    securityAppId: string;
    @Prop()
    sponsor: string;
    @Prop()
    dateOfEstablishment: string;
    @Prop()
    otherDetails: string
 
}

export const SecurityApparatusSchema = SchemaFactory.createForClass(SecurityApparatus);


