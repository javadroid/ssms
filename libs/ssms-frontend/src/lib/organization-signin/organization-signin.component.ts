import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-organization-signin',
  templateUrl: './organization-signin.component.html',
  styleUrls: ['./organization-signin.component.css'],
})
export class OrganizationSigninComponent implements OnInit {
  OrganizationsignInForm=new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', [])
  });
  constructor(private http:ServiceApi) {}

  ngOnInit(): void {}
}
