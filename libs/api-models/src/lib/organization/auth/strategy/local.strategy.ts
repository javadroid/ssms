import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { OrganizationService } from "../../organization.service";
import { OrganizationAuthService } from "../auth/organization.auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,"custom1"){

    constructor(private organizationAuthService:OrganizationAuthService){
        super()
    }

    async validate(username: string, password: string): Promise<any>{
      if(username.split('-')[0]==='ORG'){
        username = username.split('-')[1]

        const user=await this.organizationAuthService.validateUser(username, password);
        console.log("user",user)
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
      }
    }
}
