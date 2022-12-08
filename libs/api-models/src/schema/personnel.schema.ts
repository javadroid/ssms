import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonnelDoc = HydratedDocument<Personnel>;

@Schema({ timestamps: true })
export class Personnel {
  @Prop()
  typeofagency: string;
  @Prop()
  categoryofagency: string;
  @Prop()
  nameoforganization: string;
  @Prop()
  address: string;
  @Prop()
  descriptionofrole: string;
  @Prop()
  department: string;
  @Prop()
  station: string;
  @Prop()
  organizationsemail: string;
  @Prop()
  landline: string;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  middlename: string;
  @Prop()
  rank: string;
  @Prop()
  officialemail: string;
  @Prop()
  officialphone: string;
  @Prop()
  stateofservice: string;
  @Prop()
  lgaofservice: string;
  @Prop()
  divisionhead: string;
  @Prop()
  phone: string;
  @Prop()
  email: string;
  @Prop()
  branch: string;
  @Prop()
  password: string;
  @Prop()
  subcriberID: string;
}

export const PersonnelSchema = SchemaFactory.createForClass(Personnel);
