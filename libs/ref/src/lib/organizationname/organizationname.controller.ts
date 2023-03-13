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

import { OrganizationnameDTO } from '../../dto/organizationname.dto';
import { OrganizationnameService } from './organizationname.service';

@Controller('organizationname')
export class OrganizationnameController {
  constructor(private organizationnameService: OrganizationnameService) {}

  @Post()
  async create(@Body() createOrganizationname: OrganizationnameDTO) {
    return this.organizationnameService.create(createOrganizationname);
  }

    @Get()
    findAll() {
        return this.organizationnameService.findAll();
          }

    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.organizationnameService.findbyId(id);
    }

    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'organizationName' || id === 'organizationnameId') {
        return this.organizationnameService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }

    @Post(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: OrganizationnameDTO) {
      return this.organizationnameService.update(_Id, updated);
    }

    @Post('delete/:_id')
    async delete(@Param('_id') _Id: string) {
      return this.organizationnameService.delete(_Id);
    }

}
