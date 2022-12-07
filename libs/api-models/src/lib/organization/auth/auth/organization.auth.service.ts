import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrganizationService } from '../../organization.service';

@Injectable()
export class OrganizationAuthService {
  constructor(private jwtService: JwtService, private organizationService:OrganizationService){

  }
  async validateUser(username: string,password: string): Promise<any>{

    console.log("useruser1",username)
    username = username.split('-')[1]
    const user =await this.organizationService.findbyAny('organizationEmail',username)

console.log("useruser2",user)
    if(user[0] && user[0].password === password){

      return user[0]
    }

    return null
  }

  async login(user:any){
    // console.log("users",user)
    const payload ={organizationEmail:user.organizationEmail,sub:user._id}
    return {access_token: this.jwtService.sign(payload), id:user._id}
  }
}
