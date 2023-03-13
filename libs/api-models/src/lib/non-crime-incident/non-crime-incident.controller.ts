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

  import { NonCrimeIncidentDto } from '../../dto/noncrimeincident.dto';
  import { NonCrimeIncidentDoc } from '../../schema/noncrimeincident.schema';
  import { NonCrimeIncidentService } from './non-crime-incident.service';

@Controller('non-crime-incident')
export class NonCrimeIncidentController {
    constructor(private nonCrimeIncidentService: NonCrimeIncidentService) {}
  @Post()
  async create(@Body() createNonCrimeIncident: NonCrimeIncidentDoc) {
    return this.nonCrimeIncidentService.create(createNonCrimeIncident);
  }

  @Get()
  findAll() {
    return this.nonCrimeIncidentService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.nonCrimeIncidentService.findbyId(id);
  }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    if (id === 'evidence' || id === 'reportDetail' || id === 'reporterId') {
      return this.nonCrimeIncidentService.findbyAny(id, value);
    } else {
      throw new NotFoundException("fleid '" + id + "' not found");
    }
  }

  @Post(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: NonCrimeIncidentDto) {
    return this.nonCrimeIncidentService.update(_Id, updated);
  }

  @Post('delete/:_id')
  async delete(@Param('_id') _Id: string) {
    return this.nonCrimeIncidentService.delete(_Id);
  }

}
