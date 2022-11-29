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

import { StatesDTO } from '../../dto/states.dto';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private statesService: StatesService) {}

  @Post()
  async create(@Body() createStates: StatesDTO) {
    return this.statesService.create(createStates);
  }

    @Get()
    findAll() {
        return this.statesService.findAll();
          }
  
    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.statesService.findbyId(id);
    }
  
    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'nameOfState' || id === 'subscriberId') {
        return this.statesService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }
  
    @Patch(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: StatesDTO) {
      return this.statesService.update(_Id, updated);
    }
  
    @Delete(':_id')
    async delete(@Param('_id') _Id: string) {
      return this.statesService.delete(_Id);
    }
  
}
