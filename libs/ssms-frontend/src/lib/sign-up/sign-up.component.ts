import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';



@Component({
  selector: 'ssms-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit {


  constructor(private http:ServiceApi) {}

  ngOnInit(): void {}


}
