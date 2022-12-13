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
import { RankDTO } from '../../dto/rank.dto';
import { RankService } from './rank.service';
import { RankDoc } from '../../schema/rank.schema';

@Controller('rank')
export class RankController {
    constructor(private rankService: RankService) {}

  @Post()
  async create(@Body() createRank: RankDTO) {
    return this.rankService.create(createRank);
  }

    @Get()
    findAll() {
        return this.rankService.findAll();
          }

    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.rankService.findbyId(id);
    }

    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'rank' || id === 'subscriberId') {
        return this.rankService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }

    @Patch(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: RankDTO) {
      return this.rankService.update(_Id, updated);
    }

    @Delete(':_id')
    async delete(@Param('_id') _Id: string) {
      return this.rankService.delete(_Id);
    }

}
