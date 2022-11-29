import{
    Prop,
    Schema, 
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LgaDoc = HydratedDocument<Lga>;
@Schema({ timestamps: true })
export class Lga {
    @Prop()
    lgaId: string;
    @Prop()
    LgaName: string;
     
}

export const LgaSchema = SchemaFactory.createForClass(Lga);
