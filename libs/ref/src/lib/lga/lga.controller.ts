import {
    Controller,
    Body,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,

} from '@nestjs/common';

import { LgaDTO } from '../../dto/lga.dto';
import { LgaService } from './lga.service';

@Controller('lga')
export class LgaController {
    constructor(private lgaService: LgaService) {}

    @Post()
    async create(@Body() lga: LgaDTO) {
      return this.lgaService.create(lga);
    }

      @Get()
      findAll() {
          return this.lgaService.findAll();
            }

      @Get(':id')
      async findbyId(@Param('id') id: string) {
        return this.lgaService.findbyId(id);
      }

      @Get(':id/:value')
      async findbyAny(@Param('id') id: string, @Param('value') value: string) {
        if (id === 'lgaName' || id === 'lgaId') {
          return this.lgaService.findbyAny(id, value);
        } else {
          throw new NotFoundException("fleid '" + id + "' not found");
        }
      }

      @Post(':_id')
      async update(@Param('_id') _Id: string, @Body() updated: LgaDTO) {
        return this.lgaService.update(_Id, updated);
      }

      @Post('delete/:_id')
      async delete(@Param('_id') _Id: string) {
        return this.lgaService.delete(_Id);
      }

  }

