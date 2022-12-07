import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards ,Request} from '@nestjs/common';
import { PersonnelDTO } from '../../dto/personnel.dto';
import { JwtAuthGuard } from '../organization/auth/authGuard/jwtAuthGuard';
import { LocalAuthGuard } from '../organization/auth/authGuard/localAuthGuard';
import { PersonnelAuthService } from './auth/auth/personnel.auth.service';
import { PersonnelService } from './personnel.service';

@Controller('personnel')
export class PersonnelController {

  constructor(private personnelService:PersonnelService, private personnelAuthService:PersonnelAuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.personnelAuthService.login(req.user);
    // return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post()
  async create(@Body() createPersonnel: PersonnelDTO) {
    return this.personnelService.create(createPersonnel);
  }

  @Get()
  findAll() {
    return this.personnelService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.personnelService.findbyId(id);
  }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    // if (
    //   id.toLowerCase() === 'id' ||
    //   id.toLowerCase() === 'lastname' ||
    //   id.toLowerCase() === 'username' ||
    //   id.toLowerCase() === 'dob' ||
    //   id.toLowerCase() === 'email' ||
    //   id.toLowerCase() === 'phoneNo' ||
    //   id.toLowerCase() === 'image'
    // ) {
      return this.personnelService.findbyAny(id, value);
    // } else {
    //   throw new NotFoundException("fleid '" + id + "' not found");
    // }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: PersonnelDTO) {
    return this.personnelService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {

    return this.personnelService.delete(_Id);
  }
}
