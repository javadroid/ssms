import { Module } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { WeaponController } from './weapon.controller';
import { Weapon, WeaponSchema } from '../../schema/weapon.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Weapon.name, schema: WeaponSchema}])],
  providers: [WeaponService],
  controllers:[WeaponController]
})
export class WeaponModule {}
