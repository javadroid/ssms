import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css'],
})
export class OrganizationRegisterComponent implements OnInit {
  organizationcategory = [] as any[];
  organizationName = [] as any[];
  display = [] as any[];
  section=[ 'organizationCategory', 'organizationName']
  OrganizationsignUpForm = new FormGroup({
    typeOfAgency: new FormControl('', []),
    categoryOfagency: new FormControl('', []),
    organizationName: new FormControl('', []),
    address: new FormControl('', []),
    descriptionOfRole: new FormControl('', []),
    organizationEmail: new FormControl('', []),
    landline: new FormControl('', []),
    firstname: new FormControl('', []),
    lastname: new FormControl('', []),
    middlename: new FormControl('', []),
    rank: new FormControl('', []),
    officialemail: new FormControl('', []),
    officialphone: new FormControl('', []),
    state: new FormControl('', []),
    lga: new FormControl('', []),
    password: new FormControl('', []),
  });
  constructor(private http: ServiceApi) {}

  ngOnInit(): void {
    this.http.find('organizationcategory').subscribe((e) => {
      this.organizationcategory = e;
    });

    this.http.find('organizationname').subscribe((e) => {
      this.organizationName = e;
    });
  }

  onSubmit(): void {
    this.passwordGenerate();

    this.http
      .create('organization', this.OrganizationsignUpForm.value)
      .subscribe((e) => {
        this.display = [{ email: 'ORG-'+e.organizationEmail, password: e.password }];
        this.OrganizationsignUpForm.reset();
      });
  }


  onOutletLoaded(component:any) {
    component.section=this.section
    component.show='organizationCategory'
}

  passwordGenerate() {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = '1234567890';
    const specials = '!@#$%.&';
    const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
    let opt, choose;
let pass = "";
for ( let i = 0; i < 8; i++ ) {
  opt = Math.floor(Math.random() * options.length);
  choose = Math.floor(Math.random() * (options[opt].length));
  pass = pass + options[opt][choose];
  options.splice(opt, 1);
    }
    console.log(pass);

    this.OrganizationsignUpForm.patchValue({
      password: pass,
    });
  }
}
