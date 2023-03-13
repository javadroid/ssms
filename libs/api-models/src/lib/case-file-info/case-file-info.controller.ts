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

  import { CaseFileInfoDTO } from '../../dto/casefileinfo.dto';
  import { CaseFileInfoDoc } from '../../schema/casefileinfo.schema';
  import { CaseFileInfoService } from './case-file-info.service';

@Controller('case-file-info')
export class CaseFileInfoController {

    constructor(private caseFileInfoService: CaseFileInfoService) {}
    @Post()
    async create(@Body() createCaseFileInfo: CaseFileInfoDoc) {
      return this.caseFileInfoService.create(createCaseFileInfo);
    }

    @Get()
    findAll() {
      return this.caseFileInfoService.findAll();
    }

    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.caseFileInfoService.findbyId(id);
    }

    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'evidence' || id === 'reportDetail' || id === 'reporterId') {
        return this.caseFileInfoService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }

    @Post(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: CaseFileInfoDTO) {
      return this.caseFileInfoService.update(_Id, updated);
    }

    @Post('delete/:_id')
    async delete(@Param('_id') _Id: string) {
      return this.caseFileInfoService.delete(_Id);
    }

}
