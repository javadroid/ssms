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

import { WeaponDTO } from '../../dto/weapon.dto';
import { WeaponService } from './weapon.service';
import { WeaponDoc } from '../../schema/weapon.schema';

@Controller('weapon')
export class WeaponController {
    constructor(private weaponService: WeaponService) {}
    @Post()
    async create(@Body() createWeapon: WeaponDoc) {
        return this.weaponService.create(createWeapon);
      }
    
      @Get()
      findAll() {
        return this.weaponService.findAll();
      }
    
      @Get(':id')
      async findbyId(@Param('id') id: string) {
        return this.weaponService.findbyId(id);
      }
    
      @Get(':id/:value')
      async findbyAny(@Param('id') id: string, @Param('value') value: string) {
        if (id === 'weaponName'||id === 'subscriberId') {
          return this.weaponService.findbyAny(id, value);
        } else {
          throw new NotFoundException("fleid '" + id + "' not found");
        }
      }
    
      @Post(':_id')
      async update(@Param('_id') _Id: string, @Body() updated: WeaponDTO) {
        return this.weaponService.update(_Id, updated);
      }
    
      @Delete(':_id')
      async delete(@Param('_id') _Id: string) {
        return this.weaponService.delete(_Id);
      }
    
}
