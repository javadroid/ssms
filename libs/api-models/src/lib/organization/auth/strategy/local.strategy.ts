import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { OrganizationService } from "../../organization.service";
import { OrganizationAuthService } from "../auth/organization.auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private organizationAuthService:OrganizationAuthService){
        super()
    }

    async validate(username: string, password: string): Promise<any>{
      console.log("console.log(users)",username)
        const user=await this.organizationAuthService.validateUser(username, password);

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}
