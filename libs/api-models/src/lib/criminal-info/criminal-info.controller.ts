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
import { CriminalInfoDTO } from '../../dto/criminalInfo.dto';
import { CriminalInfoDoc } from '../../schema/criminalInfo.schema';
import { CriminalInfoService } from './criminal-info.service';

@Controller('criminal-info')
export class CriminalInfoController {
  constructor(private criminalInfoService: CriminalInfoService) {}
  @Post()
  async create(@Body() createCriminalInfo: CriminalInfoDTO) {
    return this.criminalInfoService.create(createCriminalInfo);
  }

  @Get()
  findAll() {
    return this.criminalInfoService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.criminalInfoService.findbyId(id);
  }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    // if (
    //   id === 'aliases' ||
    //   id === 'caseFile' ||
    //   id === 'weight' ||
    //   id === 'height' ||
    //   id === 'nin' ||
    //   id === 'profilePic' ||
    //   id === 'biometrics' ||
    //   id === 'education' ||
    //   id === 'locationId' ||
    //   id === 'occupation' ||
    //   id === 'lgaOfOrigin' ||
    //   id === 'stateOfOrigin' ||
    //   id === 'placeOfBirth' ||
    //   id === 'dateOfBirth' ||
    //   id === 'phoneNumber' ||
    //   id === 'lastName' ||
    //   id === 'firstName' ||
    //   id === 'crimeId' ||
    //   id === 'criminalId'
    // ) {
      return this.criminalInfoService.findbyAny(id, value);
    // } else {
      throw new NotFoundException("fleid '" + id + "' not found");
    // }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: CriminalInfoDTO) {
    return this.criminalInfoService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {
    return this.criminalInfoService.delete(_Id);
  }
}
