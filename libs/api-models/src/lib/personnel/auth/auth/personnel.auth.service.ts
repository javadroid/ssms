import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonnelService } from '../../personnel.service';

@Injectable()
export class PersonnelAuthService {
  constructor(private jwtService: JwtService, private personnelService:PersonnelService){

  }
  async validateUser(username: string,password: string): Promise<any>{

    console.log("user",username)

    const user =await this.personnelService.findbyAny('email',username)

console.log("useruser2",user)
    if(user[0] && user[0].password === password){

      return user[0]
    }

    return null
  }

  async login(user:any){
    console.log("users",user)
    const payload ={personnelEmail:user.email,sub:user._id}
    return {access_token: this.jwtService.sign(payload), id:user._id,user_email:'PER-'+user.email,isAuthenticated:true,user:'personnel'}
  }
}
