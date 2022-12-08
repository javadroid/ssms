import{
    Prop,
    Schema, 
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PolicyDoc = HydratedDocument<Policy>;
@Schema({ timestamps: true })
export class Policy {
    @Prop()
    subscriberId: string;
    @Prop()
    policy: string;
     
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
