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

  import { LocationInfoDTO } from '../../dto/locationinfo.dto';
  import { LocationInfoDoc } from '../../schema/locationinfo.schema';
  import { LocationInfoService } from './location-info.service';

@Controller('location-info')
export class LocationInfoController {

    constructor(private locationInfoService: LocationInfoService) {}
    @Post()
    async create(@Body() createLocationInfo: LocationInfoDoc) {
      return this.locationInfoService.create(createLocationInfo);
    }
  
    @Get()
    findAll() {
      return this.locationInfoService.findAll();
    }
  
    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.locationInfoService.findbyId(id);
    }
  
    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'evidence' || id === 'reportDetail' || id === 'reporterId') {
        return this.locationInfoService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }
  
    @Post(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: LocationInfoDTO) {
      return this.locationInfoService.update(_Id, updated);
    }
  
    @Delete(':_id')
    async delete(@Param('_id') _Id: string) {
      return this.locationInfoService.delete(_Id);
    }
  


}
