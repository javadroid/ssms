import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import  { HydratedDocument,  } from 'mongoose';


export type OrganizationDoc = HydratedDocument<Organization>;

@Schema({ timestamps: true })
export class Organization {

  @Prop()
    typeOfAgency: string
     @Prop()

    categoryOfagency: string
     @Prop()
    organizationName: string
     @Prop()
    address: string
     @Prop()
    descriptionOfRole: string
     @Prop()
    organizationEmail: string
     @Prop()
    landline: string
     @Prop()
    firstname: string
     @Prop()
    lastname: string
     @Prop()
    middlename: string
     @Prop()
    rank: string
     @Prop()
    officialemail: string
     @Prop()
    officialphone: string
     @Prop()
    state: string
     @Prop()
    lga: string
     @Prop()
    password: string

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);


