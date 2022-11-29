import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';



@Component({
  selector: 'ssms-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit {
  signUpForm=new FormGroup({
    firstname: new FormControl('', []),
    lastname: new FormControl('', []),
    occupation:new FormControl('', []),
    phonenumber:new FormControl('', []),
    contactaddress:new FormControl('', []),
    email:new FormControl('', []),
    password:new FormControl('', []),
    confirmpassword: new FormControl('', []),
    radio: new FormControl('', [])

  });
 
  constructor(private http:ServiceApi) {}

  ngOnInit(): void {}
  

}
