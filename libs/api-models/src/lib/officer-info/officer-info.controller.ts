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
import { OfficerInfoDTO } from '../../dto/officerInfo.dto';
import { OfficerInfoService } from './officer-info.service';
import { officerInfoDoc } from '../../schema/officerInfo.schema';

@Controller('officer-info')
export class OfficerInfoController {
    constructor(private officerInfoService: OfficerInfoService) {}
    @Post()
    async create(@Body() createOfficerInfo: officerInfoDoc) {
      return this.officerInfoService.create(createOfficerInfo);
    }

    @Get()
    findAll() {
      return this.officerInfoService.findAll();
    }

    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.officerInfoService.findbyId(id);
    }

    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'evidence' || id === 'reportDetail' || id === 'reporterId') {
        return this.officerInfoService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }

    @Post(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: OfficerInfoDTO) {
      return this.officerInfoService.update(_Id, updated);
    }

    @Post('delete/:_id')
    async delete(@Param('_id') _Id: string) {
      return this.officerInfoService.delete(_Id);
    }
  }


