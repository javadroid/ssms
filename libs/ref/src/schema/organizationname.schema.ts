import{
    Prop,
    Schema, 
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationnameDoc = HydratedDocument<Organizationname>;
@Schema({ timestamps: true })
export class Organizationname {
    @Prop()
    subscriberId: string;
    @Prop()
    organizationName: string;
     
}

export const OrganizationnameSchema = SchemaFactory.createForClass(Organizationname);
