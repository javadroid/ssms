import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Organization, OrganizationSchema } from '../../schema/organization.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { OrganizationAuthService } from './auth/auth/organization.auth.service';


@Module({

  imports:[MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),PassportModule,
  JwtModule.register({
  secret:process.env.JWT_CONSTANT,
  signOptions:{expiresIn:'120s'}
}),PassportModule
],


  controllers: [OrganizationController],
  providers: [OrganizationService,JwtStrategy,LocalStrategy,OrganizationAuthService]
})
export class OrganizationModule {}
