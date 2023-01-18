import { Component, OnInit } from '@angular/core';
import { ServiceApi } from '../shared/service/service-api';
import {FormGroup, FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  constructor(private http:ServiceApi,private route:Router) {}

  async ngOnInit(): Promise<void> {
console.log('xs',localStorage.getItem('email'))

    if(localStorage.getItem('email')?.split('-')[0]==='ORG'){
       this.http.profile('organization').subscribe(a=>{
        localStorage.setItem('id', a.userId);
        this.route.navigate(['/dashboard'])
        console.log("profile",a)
      })
    }else if(localStorage.getItem('email')?.split('-')[0]==='PER'){
       this.http.profile('personnel').subscribe(a=>{
       localStorage.setItem('id', a.userId);
        this.route.navigate(['/home'])

                console.log("profile",a)

      })
    }else console.log('nssssss',localStorage.getItem('email'))

  }

onSubmit(){
  console.log(this.loginForm.value)


     if(this.loginForm.controls.username.value?.split('-')[0]==='ORG'){
    this.http.login('organization', this.loginForm.value).subscribe(e=>{
      console.log(e.status)

      if(e.status=="DISABLE"){
        console.log(e.status)
        localStorage.clear()
        Swal.fire(
          'Account Disable ',
          'Contact your administrator'
          ,
          'success'
        );

      }else if(e.status=="ACTIVE"){
        localStorage.setItem('id', e._id);
      this.route.navigate(['/dashboard'])
      }

    },err=>{
      console.log(err);
      if(err.error.statusCode===401||err.error.statusCode===404){
        Swal.fire(
          'Incorrect Email or Password ',
          'Contact your administrator'
          ,
          'error'
        );
      }
    })
  }else if(this.loginForm.controls.username.value?.split('-')[0]==='PER'){
    this.http.login('personnel', this.loginForm.value).subscribe(e=>{
      if(e.status=="DISABLE"){
        localStorage.clear()
        Swal.fire(
          'Account Disable ',
          'Contact your administrator'
          ,
          'success'
        );

      }else if(e.status=="ACTIVE"){
        localStorage.setItem('id', e.id);
      this.route.navigate(['/home'])
      console.log(e)
      }

    },err=>{
      console.error(err);

      if(err.error.statusCode===401||err.error.statusCode===404){
        Swal.fire(
          'Incorrect Email or Password ',
          'Contact your administrator'
          ,
          'error'
        );
      }
    })
  }


}
}
