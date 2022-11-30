/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ssms-organization-signup',
  templateUrl: './organization-signup.component.html',
  styleUrls: ['./organization-signup.component.css'],
})
export class OrganizationSignupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  stepper=true
  stepperbtnactive=false

  makeTableClassID(id:any){

    return id
  }
}
