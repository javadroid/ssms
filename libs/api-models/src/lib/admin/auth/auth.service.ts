import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrganizationService } from '../../organization/organization.service';
import { PersonnelService } from '../../personnel/personnel.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,private organizationService:OrganizationService){

  }
  async validateUser(username: string,password: string): Promise<any>{

    console.log("useruser1",username)
    const user =['await this.personnelService.findbyAny(,username)','']

console.log("useruser2",user)
    if(user[0] && user[0].password === password){

      return user[0]
    }

    return null
  }

  async login(user:any){
    // console.log("users",user)
    const payload ={personnelEmail:user.personnelEmail,sub:user._id}
    return {access_token: this.jwtService.sign(payload), id:user._id}
  }
}
