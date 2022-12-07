import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { PersonnelAuthService } from "../auth/personnel.auth.service";




@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private personnelAuthService:PersonnelAuthService){
        super()
    }

    async validate(username: string, password: string): Promise<any>{
      console.log("console.log(users)",username)
        const user=await this.personnelAuthService.validateUser(username, password);

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}
