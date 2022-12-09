import{
    Prop,
    Schema, 
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BranchDoc = HydratedDocument<Branch>;
@Schema({ timestamps: true })
export class Branch {
    @Prop()
    subscriberId: string;
    @Prop()
    branchName: string;
     
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
