import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt1") {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_CONSTANT_ORG'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, organizationEmail: payload.organizationEmail,isAuthenticated:true,user:'organization'};
  }

}
