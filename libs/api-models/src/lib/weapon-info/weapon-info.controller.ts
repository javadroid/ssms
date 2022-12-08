import { 
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post, 
} from '@nestjs/common';

import { WeaponInfoDTO } from '../../dto/weaponInfo.dto';
import { WeaponInfoDoc } from '../../schema/weaponInfo.schema';
import { WeaponInfoService } from './weapon-info.service';

@Controller('weapon-info')
export class WeaponInfoController {
    constructor(private weaponInfoService: WeaponInfoService) {}
    @Post()
    async create(@Body() createWeaponInfo: WeaponInfoDoc) {
        return this.weaponInfoService.create(createWeaponInfo);
      }
    
      @Get()
      findAll() {
        return this.weaponInfoService.findAll();
      }
    
      @Get(':id')
      async findbyId(@Param('id') id: string) {
        return this.weaponInfoService.findbyId(id);
      }
    
      @Get(':id/:value')
      async findbyAny(@Param('id') id: string, @Param('value') value: string) {
        if (id === 'specification'||id === 'dateOfPurchase'||id === 'ownerName' || id === 'weaponName' || id === 'weaponId') {
          return this.weaponInfoService.findbyAny(id, value);
        } else {
          throw new NotFoundException("fleid '" + id + "' not found");
        }
      }
    
      @Patch(':_id')
      async update(@Param('_id') _Id: string, @Body() updated: WeaponInfoDTO) {
        return this.weaponInfoService.update(_Id, updated);
      }
    
      @Delete(':_id')
      async delete(@Param('_id') _Id: string) {
        return this.weaponInfoService.delete(_Id);
      }
    
}
