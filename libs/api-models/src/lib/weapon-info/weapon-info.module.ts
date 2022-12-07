import { Module } from '@nestjs/common';
import { WeaponInfoService } from './weapon-info.service';
import { WeaponInfoController } from './weapon-info.controller';
import { WeaponInfo,WeaponInfoSchema } from '../../schema/weaponInfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: WeaponInfo.name, schema: WeaponInfoSchema}])],
  providers: [WeaponInfoService],
  controllers:[WeaponInfoController]
})
export class WeaponInfoModule {}
