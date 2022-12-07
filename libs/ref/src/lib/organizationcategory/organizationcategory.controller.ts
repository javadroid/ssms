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

import { OrganizationcategoryDTO } from '../../dto/organizationcategory.dto';
import { OrganizationcategoryService } from './organizationcategory.service';

@Controller('organizationcategory')
export class OrganizationcategoryController {
  constructor(private organizationacategoryService: OrganizationcategoryService) {}

  @Post()
  async create(@Body() createOrganizationcategory: OrganizationcategoryDTO) {
    return this.organizationacategoryService.create(createOrganizationcategory);
  }

    @Get()
    findAll() {
        return this.organizationacategoryService.findAll();
          }
  
    @Get(':id')
    async findbyId(@Param('id') id: string) {
      return this.organizationacategoryService.findbyId(id);
    }
  
    @Get(':id/:value')
    async findbyAny(@Param('id') id: string, @Param('value') value: string) {
      if (id === 'organizationCategoryName' || id === 'organizationcategoryId') {
        return this.organizationacategoryService.findbyAny(id, value);
      } else {
        throw new NotFoundException("fleid '" + id + "' not found");
      }
    }
  
    @Patch(':_id')
    async update(@Param('_id') _Id: string, @Body() updated: OrganizationcategoryDTO) {
      return this.organizationacategoryService.update(_Id, updated);
    }
  
    @Delete(':_id')
    async delete(@Param('_id') _Id: string) {
      return this.organizationacategoryService.delete(_Id);
    }
  
}
