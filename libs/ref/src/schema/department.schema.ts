import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DepartmentDoc = HydratedDocument<Department>;
@Schema({ timestamps: true })
export class Department {
  @Prop()
  departmentId: string;
  @Prop()
  departmentName: string;
  @Prop()
  organizationId: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
