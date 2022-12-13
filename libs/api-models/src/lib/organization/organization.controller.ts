import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Response,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrganizationDTO } from '../../dto/organization.dto';
import { OrganizationAuthService } from './auth/auth/organization.auth.service';

import { JwtAuthGuard } from './auth/authGuard/jwtAuthGuard';
import { LocalAuthGuard } from './auth/authGuard/localAuthGuard';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
constructor(private organizationService:OrganizationService, private organizationAuthService:OrganizationAuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.organizationAuthService.login(req.user);
    // return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req, @Response()res) {
     req.logout();

  res.redirect('/');
  }
  @Post()
  async create(@Body() createOrganization: OrganizationDTO) {
    return this.organizationService.create(createOrganization);
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.organizationService.findbyId(id);
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
      return this.organizationService.findbyAny(id, value);
    // } else {
    //   throw new NotFoundException("fleid '" + id + "' not found");
    // }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: OrganizationDTO) {
    return this.organizationService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {

    return this.organizationService.delete(_Id);
  }
}
