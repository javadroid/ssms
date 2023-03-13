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

import { DepartmentDTO } from '../../dto/department.dto';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createReport: DepartmentDTO) {
    return this.departmentService.create(createReport);
  }

    @Get()
    findAll() {
        return this.departmentService.findAll();
          }

    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.departmentService.findbyId(id);
    }

    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'departmentName' || id === 'departmentId') {
        return this.departmentService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }

    @Post(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: DepartmentDTO) {
      return this.departmentService.update(_Id, updated);
    }

    @Post('delete/:_id')
    async delete(@Param('_id') _Id: string) {
      return this.departmentService.delete(_Id);
    }

}
