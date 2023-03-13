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

  import { SecurityApparatusDTO } from '../../dto/securityapparatus.dto';
  import { SecurityApparatusDoc } from '../../schema/securityapparatus.schema';
  import { SecurityApparatusService } from './security-apparatus.service';

@Controller('security-apparatus')
export class SecurityApparatusController {

    constructor(private securityApparatusService: SecurityApparatusService) {}
    @Post()
    async create(@Body() createSecurityApparatus: SecurityApparatusDoc) {
      return this.securityApparatusService.create(createSecurityApparatus);
    }

    @Get()
    findAll() {
      return this.securityApparatusService.findAll();
    }

    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.securityApparatusService.findbyId(id);
    }

    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'evidence' || id === 'reportDetail' || id === 'reporterId') {
        return this.securityApparatusService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }

    @Post(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: SecurityApparatusDTO) {
      return this.securityApparatusService.update(_Id, updated);
    }

    @Post('delete/:_id')
    async delete(@Param('_id') _Id: string) {
      return this.securityApparatusService.delete(_Id);
    }




}
