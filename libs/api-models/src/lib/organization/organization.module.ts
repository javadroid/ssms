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
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({

  imports:[MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),PassportModule,
  PassportModule,
JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get<string>('JWT_CONSTANT_ORG'),
    };
  },
  inject: [ConfigService],
    })
],


  controllers: [OrganizationController],
  providers: [OrganizationService,JwtStrategy,LocalStrategy,OrganizationAuthService]
})
export class OrganizationModule {}
