import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonnelModule } from '../../personnel.module';

import { JwtStrategy } from '../strategy/jwt.strategy';
import { LocalStrategy } from '../strategy/local.strategy';
import { PersonnelAuthService } from './personnel.auth.service';


@Module({

  imports:[PersonnelModule,],

  providers: [PersonnelAuthService,LocalStrategy,JwtStrategy,JwtService],
})
export class PersonnelAuthModule {


}
