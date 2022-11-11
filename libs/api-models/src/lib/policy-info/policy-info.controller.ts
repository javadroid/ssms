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
import { PolicyInfoDTO } from '../../dto/policyInfo.dto';
import { PolicyInfoDoc } from '../../schema/policyInfo.schema';
import { PolicyInfoService } from './policy-info.service';

@Controller('policy-info')
export class PolicyInfoController {
  constructor(private policyInfoService: PolicyInfoService) {}
  @Post()
  async create(@Body() createPolicyInfo: PolicyInfoDoc) {
    return this.policyInfoService.create(createPolicyInfo);
  }

  @Get()
  findAll() {
    return this.policyInfoService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.policyInfoService.findbyId(id);
  }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    if (id === 'evidence' || id === 'reportDetail' || id === 'reporterId') {
      return this.policyInfoService.findbyAny(id, value);
    } else {
      throw new NotFoundException("fleid '" + id + "' not found");
    }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: PolicyInfoDTO) {
    return this.policyInfoService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {
    return this.policyInfoService.delete(_Id);
  }
}
