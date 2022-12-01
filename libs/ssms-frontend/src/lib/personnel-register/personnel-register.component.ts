/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-personnel-register',
  templateUrl: './personnel-register.component.html',
  styleUrls: ['./personnel-register.component.css'],
})
export class PersonnelRegisterComponent implements OnInit {
    PersonnelRegisterForm=new FormGroup({
      typeofagency: new FormControl('', []),
      categoryofagency: new FormControl('', []),
      nameoforganization:new FormControl('', []),
      address:new FormControl('', []),
      descriptionofrole:new FormControl('', []),
      department:new FormControl('', []),
      station:new FormControl('', []),
      organizationsemail:new FormControl('', []),
      landline:new FormControl('', []),
      firstname: new FormControl('', []),
      lastname: new FormControl('', []),
      middlename: new FormControl('', []),
      rank: new FormControl('', []),
      officialemail: new FormControl('', []),
      officialphone: new FormControl('', []),
      stateofservice: new FormControl('', []),
      lgaofservice: new FormControl('', []),
      divisionhead: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
      branch: new FormControl('', [])
    });
  constructor(private http:ServiceApi) {}

  ngOnInit(): void {}
  
  stepper=false;
  stepperactive=false
}
