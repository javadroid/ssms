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

import { StationDTO } from '../../dto/station.dto';
import { StationService } from './station.service';

@Controller('station')
export class StationController {
  constructor(private stationService: StationService) {}

  @Post()
  async create(@Body() createStation: StationDTO) {
    return this.stationService.create(createStation);
  }

    @Get()
    findAll() {
        return this.stationService.findAll();
          }
  
    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.stationService.findbyId(id);
    }
  
    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'stationName' || id === 'stationId') {
        return this.stationService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }
  
    @Patch(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: StationDTO) {
      return this.stationService.update(_Id, updated);
    }
  
    @Delete(':_id')
    async delete(@Param('_id') _Id: string) {
      return this.stationService.delete(_Id);
    }
  
}
