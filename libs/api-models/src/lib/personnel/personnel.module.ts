import { Module } from '@nestjs/common';
import { PersonnelService } from './personnel.service';
import { PersonnelController } from './personnel.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Personnel, PersonnelSchema } from '../../schema/personnel.schema';
import { PersonnelAuthService } from './auth/auth/personnel.auth.service';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { LocalStrategy } from './auth/strategy/local.strategy';

@Module({



  imports:[MongooseModule.forFeature([{ name: Personnel.name, schema: PersonnelSchema }]),PassportModule,
  JwtModule.register({
  secret:process.env.JWT_CONSTANT,
  signOptions:{expiresIn:'120s'}
}),PassportModule
],


  providers: [PersonnelService,JwtStrategy,LocalStrategy,PersonnelAuthService],

  controllers: [PersonnelController]
})
export class PersonnelModule {}
