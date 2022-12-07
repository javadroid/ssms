import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrganizationModule } from '../../organization.module';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { LocalStrategy } from '../strategy/local.strategy';
import { OrganizationAuthService } from './organization.auth.service';

@Module({

  imports:[OrganizationModule,],

  providers: [OrganizationAuthService,LocalStrategy,JwtStrategy,JwtService],
})
export class OrganizationAuthModule {


}
