import{
    Prop,
    Schema, 
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StationDoc = HydratedDocument<Station>;
@Schema({ timestamps: true })
export class Station {
    @Prop()
    subscriberId: string;
    @Prop()
    stationName: string;
     
}

export const StationSchema = SchemaFactory.createForClass(Station);
