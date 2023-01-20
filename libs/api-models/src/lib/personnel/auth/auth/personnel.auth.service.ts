import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonnelService } from '../../personnel.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PersonnelAuthService {
  constructor(private jwtService: JwtService, private personnelService:PersonnelService){

  }
  async validateUser(username: string,password: string): Promise<any>{

    console.log("user",username)

    const user =await this.personnelService.findbyAny('email',username)
    console.log("useruser2",user)
    if(!user[0]){
      throw new NotFoundException("User not found")
    }
const isMatch = user[0]? await bcrypt.compare(password, user[0].password) :null;

  if(user[0] && isMatch){

      return user[0]
    }

    return null
  }

  async login(user:any){
    console.log("users",user)
    const payload ={personnelEmail:user.email,sub:user._id}
    return {access_token: this.jwtService.sign(payload), status:user.status,id:user._id,user_email:'PER-'+user.email,isAuthenticated:true,user:'personnel'}
  }
}
