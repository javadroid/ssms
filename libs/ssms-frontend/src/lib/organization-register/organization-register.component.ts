import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css'],
})
export class OrganizationRegisterComponent implements OnInit {
  organizationcategory=[]as any[]
  organizationName=[]as any[]
  display=[]as any[]

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

  ngOnInit(): void {

    this.http.find('organizationcategory').subscribe((e)=>{
      this.organizationcategory=e
    })

    this.http.find('organizationname').subscribe((e)=>{
      this.organizationName=e
    })

  }

  onSubmit(): void {
    this.http.create('organization',this.OrganizationsignUpForm.value).subscribe(e=>{
this.display=[{email:e.organizationEmail,password:e.password}]
    })
  }

  stepper=true
  stepperbtnactive=false

  makeTableClassID(id:any){

    return id
  }
}
