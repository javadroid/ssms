import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-personnel-register',
  templateUrl: './personnel-register.component.html',
  styleUrls: ['./personnel-register.component.css'],
})
export class PersonnelRegisterComponent implements OnInit {
  firstShow = true;
  showSecond = false;
  stepper = false;
  stepperactive = false;
  PersonnelRegisterForm!: FormGroup;

  constructor(
    private http: ServiceApi,
    private personnelformbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.PersonnelRegisterForm = this.personnelformbuilder.group({
      typeofagency: [''],
      categoryofagency: [''],
      nameoforganization: [''],
      address: [''],
      descriptionofrole: [''],
      department: [''],
      station: [''],
      organizationsemail: [''],
      landline: [''],
      firstname: [''],
      lastname: [''],
      middlename: [''],
      rank: [''],
      officialemail: [''],
      officialphone: [''],
      stateofservice: [''],
      lgaofservice: [''],
      divisionhead: [''],
      phone: [''],
      email: [''],
      branch: [''],
    });
  }

  createNew() {
    this.firstShow = false;
    this.showSecond = true;
  }
  Backward() {
    this.firstShow = true;
    this.showSecond = false;
  }
  SubmitPersonnel() {
    const data = this.PersonnelRegisterForm.value;

    this.http.create('personnel', data).subscribe((n) => {
      console.log('create personel', n);
    });
  }
}
