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

import { BranchDTO } from '../../dto/branch.dto';
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Post()
  async create(@Body() createBranch: BranchDTO) {
    return this.branchService.create(createBranch);
  }

    @Get()
    findAll() {
        return this.branchService.findAll();
          }
  
    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.branchService.findbyId(id);
    }
  
    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'branchName' || id === 'branchId') {
        return this.branchService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }
  
    @Patch(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: BranchDTO) {
      return this.branchService.update(_Id, updated);
    }
  
    @Delete(':_id')
    async delete(@Param('_id') _Id: string) {
      return this.branchService.delete(_Id);
    }
  
}
