import {Body,
        Controller,
        Delete,
        Get,
        NotFoundException,
        Param,
        Patch,
        Post, } from '@nestjs/common';
import { DivisionInfoDTO } from '../../dto/divisionInfo.dto';
import { DivisionInfoService } from './division-info.service';
import { DivisionInfoDoc } from '../../schema/divisionInfo.schema';

@Controller('division-info')
export class DivisionInfoController {
    constructor(private divisionInfoService: DivisionInfoService) {}
  @Post()
  async create(@Body() createDivisionInfo: DivisionInfoDoc) {
    return this.divisionInfoService.create(createDivisionInfo);
  }

  @Get()
  findAll() {
    return this.divisionInfoService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.divisionInfoService.findbyId(id);
  }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    if (id === 'evidence' || id === 'reportDetail' || id === 'reporterId') {
      return this.divisionInfoService.findbyAny(id, value);
    } else {
      throw new NotFoundException("fleid '" + id + "' not found");
    }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: DivisionInfoDTO) {
    return this.divisionInfoService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {
    return this.divisionInfoService.delete(_Id);
  }
}
