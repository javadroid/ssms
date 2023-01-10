/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';


@Component({
  selector: 'ssms-organization-signup',
  templateUrl: './organization-signup.component.html',
  styleUrls: ['./organization-signup.component.css'],
})
export class OrganizationSignupComponent implements OnInit {
  OrganizationsignUpForm=new FormGroup({
    typeofagency: new FormControl('', []),
    categoryofagency: new FormControl('', []),
    nameoforganization:new FormControl('', []),
    address:new FormControl('', []),
    descriptionofrole:new FormControl('', []),
    organizationsemail:new FormControl('', []),
    landline:new FormControl('', []),
    firstname: new FormControl('', []),
    lastname: new FormControl('', []),
    middlename: new FormControl('', []),
    rank: new FormControl('', []),
    officialemail: new FormControl('', []),
    officialphone: new FormControl('', []),
    stateofservice: new FormControl('', []),
    lgaofservice: new FormControl('', [])
  });
  constructor(private http:ServiceApi) {}

  ngOnInit(): void {}

  stepper=true
  stepperbtnactive=false

  makeTableClassID(id:any){

    return id
  }
}
