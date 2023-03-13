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
import { PolicyDTO } from '../../dto/policy.dto';
import { PolicyService } from './policy.service';
import { PolicyDoc } from '../../schema/policy.schema';

@Controller('policy')
export class PolicyController {
    constructor(private policyService: PolicyService) {}

  @Post()
  async create(@Body() createPolicy: PolicyDTO) {
    return this.policyService.create(createPolicy);
  }

    @Get()
    findAll() {
        return this.policyService.findAll();
          }

    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.policyService.findbyId(id);
    }

    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'policy' || id === 'subscriberId') {
        return this.policyService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }

    @Post(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: PolicyDTO) {
      return this.policyService.update(_Id, updated);
    }

    @Delete(':_id')
    async delete(@Param('_id') _Id: string) {
      return this.policyService.delete(_Id);
    }

}
