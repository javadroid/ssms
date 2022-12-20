import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CrimeTypeDTO } from '../../dto/crimeType.dto';
import { CrimeTypeService } from './crime-type.service';

@Controller('crime-type')
export class CrimeTypeController {

  constructor(private crimeTypeService: CrimeTypeService) {}

  @Post()
  async create(@Body() createCrimeType: CrimeTypeDTO) {
    return this.crimeTypeService.create(createCrimeType);
  }

    @Get()
    findAll() {
        return this.crimeTypeService.findAll();
          }

    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.crimeTypeService.findbyId(id);
    }

    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'crimeTypeName' || id === 'crimeTypeId') {
        return this.crimeTypeService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }

    @Patch(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: CrimeTypeDTO) {
      return this.crimeTypeService.update(_Id, updated);
    }

    @Delete(':_id')
    async delete(@Param('_id') _Id: string) {
      return this.crimeTypeService.delete(_Id);
    }

}
