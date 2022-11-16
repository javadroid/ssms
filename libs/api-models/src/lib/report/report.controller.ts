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
import { ReportDTO } from '../../dto/report.dto';
import { ReportService } from './report.service';
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}
  @Post()
  async create(@Body() createReport: ReportDTO) {
    return this.reportService.create(createReport);
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.reportService.findbyId(id);
  }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    if (
      id === 'state' ||
      id === 'crimeId' ||
      id === 'crimeCategory' ||
      id === 'policy'
    ) {
      return this.reportService.findbyAny(id, value);
    } else {
      throw new NotFoundException("fleid '" + id + "' not found");
    }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: ReportDTO) {
    return this.reportService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {
    return this.reportService.delete(_Id);
  }

  @Delete()
  async deleteMany(@Body() _id: string[]) {
    return this.reportService.deleteMany(_id);
  }
}
