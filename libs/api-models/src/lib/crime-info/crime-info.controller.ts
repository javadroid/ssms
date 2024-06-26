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
import { CrimeInfoDTO } from '../../dto/crimeInfo.dto';
import { CrimeInfoDoc } from '../../schema/crimeInfo.schema';
import { CrimeInfoService } from './crime-info.service';

@Controller('crime-info')
export class CrimeInfoController {
    constructor(private crimeInfoService: CrimeInfoService) {}
    @Post()
    async create(@Body() createCrimeInfo: CrimeInfoDoc) {
        return this.crimeInfoService.create(createCrimeInfo);
      }
    
      @Get()
      findAll() {
        return this.crimeInfoService.findAll();
      }
    
      @Get(':id')
      async findbyId(@Param('id') id: string) {
        return this.crimeInfoService.findbyId(id);
      }
    
      @Get(':id/:value')
      async findbyAny(@Param('id') id: string, @Param('value') value: string) {
        if (id === 'locationId'||id === 'reportId'||id === 'vehicleId'||id === 'victimId'||id === 'motive'||id === 'criminalId'||id === 'progressStatus'||id === 'policyId'||id === 'crimeEvidence'||id === 'incidentId'||id === 'statementOfOffense'||id === 'crimeTime'||id === 'crimeDate'||id === 'crimeCategory'||id === 'weaponId'||id === 'securityAppId' || id === 'officerId' || id === 'crimeId') {
          return this.crimeInfoService.findbyAny(id, value);
        } else {
          throw new NotFoundException("fleid '" + id + "' not found");
        }
      }
    
      @Patch(':_id')
      async update(@Param('_id') _Id: string, @Body() updated: CrimeInfoDTO) {
        return this.crimeInfoService.update(_Id, updated);
      }
    
      @Delete(':_id')
      async delete(@Param('_id') _Id: string) {
        return this.crimeInfoService.delete(_Id);
      }
    
    

}
