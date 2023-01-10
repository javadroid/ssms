import{
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RankDoc = HydratedDocument<Rank>;
@Schema({ timestamps: true })
export class Rank {
    @Prop()
    subscriberId: string;
    @Prop()
    rank: string;
    @Prop()
    organizationId: string;


}

export const RankSchema = SchemaFactory.createForClass(Rank);
