import{
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument, } from 'mongoose';

export type WeaponDoc = HydratedDocument<Weapon>;

@Schema ({ timestamps:true })
export class Weapon {
    @Prop()
    subscriberId: string;
    @Prop()
    weaponName: string;    
}
export const WeaponSchema = SchemaFactory.createForClass(Weapon);