import { Component, OnInit } from '@angular/core';
import { ServiceApi } from '../shared/service/service-api';
import {FormGroup, FormControl} from '@angular/forms'

@Component({
  selector: 'ssms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    username: new FormControl('', []),
    password: new FormControl('', [])
  });
  constructor(private http:ServiceApi) {}

  async ngOnInit(): Promise<void> {
     await this.http.profile('organization').subscribe(a=>{


      console.log("profile",a)
    })

  }

onSubmit(){
  console.log(this.loginForm.value)
  if(this.loginForm.controls.username.value?.split('-')[0]==='ORG'){
    this.http.login('organization', this.loginForm.value).subscribe(e=>{
      console.log(e)
    })
  }else if(this.loginForm.controls.username.value?.split('-')[0]==='PRE'){
    this.http.login('personnel', this.loginForm.value).subscribe(e=>{
      console.log(e)
    })
  }

}
}
