import{
    Prop,
    Schema, 
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationcategoryDoc = HydratedDocument<Organizationcategory>;
@Schema({ timestamps: true })
export class Organizationcategory {
    @Prop()
    OrganizationcategoryId: string;
    @Prop()
    naOrganizationCategoryName: string;
     
}

export const OrganizationcategorySchema = SchemaFactory.createForClass(Organizationcategory);
