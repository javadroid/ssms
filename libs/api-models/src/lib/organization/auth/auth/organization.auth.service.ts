import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrganizationService } from '../../organization.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class OrganizationAuthService {
  constructor(
    private jwtService: JwtService,
    private organizationService: OrganizationService,
    private config: ConfigService
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.organizationService.findbyAny(
      'organizationEmail',
      username
    );

    if (!user[0]) {
      throw new NotFoundException('User not found');
    }
    console.log('sss', password,user[0].password);
    const isMatch = await bcrypt.compare(password, user[0].password);
    console.log('useruser2', isMatch);
    if (user[0] && isMatch) {
      return user[0];
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      organizationEmail: user.organizationEmail,
      sub: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload, {secret: this.config.get('JWT_CONSTANT_ORG')}),
      _id: user._id,
      user_email: 'ORG-' + user.organizationEmail,
      isAuthenticated: true,
      user: 'organization',
      status:user.status
    };
  }
}
