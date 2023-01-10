import{
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CrimeTypeDoc = HydratedDocument<CrimeType>;
@Schema({ timestamps: true })
export class CrimeType {
    @Prop()
    subscriberId: string;
    @Prop()
    crimetype: string;

}

export const CrimeTypeSchema = SchemaFactory.createForClass(CrimeType);
