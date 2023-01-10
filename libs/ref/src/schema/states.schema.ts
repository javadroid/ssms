import{
    Prop,
    Schema, 
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatesDoc = HydratedDocument<States>;
@Schema({ timestamps: true })
export class States {
    @Prop()
    subscriberId: string;
    @Prop()
    nameOfState: string;
     
}

export const StatesSchema = SchemaFactory.createForClass(States);
