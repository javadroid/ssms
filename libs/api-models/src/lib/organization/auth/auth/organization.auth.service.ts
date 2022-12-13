
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrganizationService } from '../../organization.service';

@Injectable()
export class OrganizationAuthService {
  constructor(private jwtService: JwtService, private organizationService:OrganizationService){

  }
  async validateUser(username: string,password: string): Promise<any>{
    const user =await this.organizationService.findbyAny('organizationEmail',username)
    console.log("sss",password)
console.log("useruser2",user)
    if(user[0] && user[0].password === password){

      return user[0]
    }

    return null
  }

  async login(user:any){


    const payload ={organizationEmail:user.organizationEmail,sub:user._id}
    return {access_token: this.jwtService.sign(payload), _id:user._id,user_email:'ORG-'+user.organizationEmail,isAuthenticated:true,user:'organization'}
  }
}
