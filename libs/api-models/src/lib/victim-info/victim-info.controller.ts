import {Body,
        Controller,
        Delete,
        Get,
        NotFoundException,
        Param,
        Patch,
        Post, } from '@nestjs/common';
import { VictimInfoDTO } from '../../dto/victimInfo.dto';
import { VictimInfoService } from './victim-info.service';
import { VictimInfoDoc } from '../../schema/victimInfo.schema';
@Controller('victim-info')
export class VictimInfoController {
    constructor(private victimInfoService: VictimInfoService) {}
  @Post()
  async create(@Body() createVictimInfo: VictimInfoDoc) {
    return this.victimInfoService.create(createVictimInfo);
  }

  @Get()
  findAll() {
    return this.victimInfoService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.victimInfoService.findbyId(id);
  }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    if (id === 'evidence' || id === 'reportDetail' || id === 'reporterId') {
      return this.victimInfoService.findbyAny(id, value);
    } else {
      throw new NotFoundException("fleid '" + id + "' not found");
    }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: VictimInfoDTO) {
    return this.victimInfoService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {
    return this.victimInfoService.delete(_Id);
  }
}
