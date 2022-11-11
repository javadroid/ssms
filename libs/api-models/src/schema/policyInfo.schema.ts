import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';
  
  
  export type PolicyInfoDoc = HydratedDocument<PolicyInfo>;

@Schema({ timestamps: true })
export class PolicyInfo {
    @Prop()
    reporterId: string;
    @Prop()
    reportDetail: string;
    @Prop()
    evidence: string
 
}

export const PolicyInfoSchema = SchemaFactory.createForClass(PolicyInfo);


