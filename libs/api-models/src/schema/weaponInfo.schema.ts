import{
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument, } from 'mongoose';

export type WeaponInfoDoc = HydratedDocument<WeaponInfo>;

@Schema ({ timestamps:true })
export class WeaponInfo {
    @Prop()
    weaponId: string;
    @Prop()
    weaponName: string;
    @Prop()
    ownerName: string;
    @Prop()
    dateOfPurchase: string;
    @Prop()
    specification: string;
    
}
export const WeaponInfoSchema = SchemaFactory.createForClass(WeaponInfo);