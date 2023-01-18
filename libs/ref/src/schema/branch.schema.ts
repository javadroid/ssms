import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BranchDoc = HydratedDocument<Branch>;
@Schema({ timestamps: true })
export class Branch {
  @Prop()
  branchId: string;
  @Prop()
  branchName: string;
  @Prop()
  organizationId: string;
  @Prop()
  subscriberId: string;
  @Prop()
  state:string
  @Prop()
  lga:string
  @Prop()
  country:string
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
