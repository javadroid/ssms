import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import Swal from 'sweetalert2';

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
  organizationID = '6391b7664a233b1ce3185e04';
  PersonnelDetail: any[] = [];
  stateDetails: any[] = [];
  constructor(
    private http: ServiceApi,
    private personnelformbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.LoadAll();
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
      refNunmber: [''],
      organizationId: [this.organizationID],
      id: [''],
    });
  }
  LoadAllpersonnel() {
    this.http.find('personnel').subscribe((m) => {
      this.PersonnelDetail = m.filter(
        (n: { organizationId: string }) =>
          n.organizationId === this.organizationID
      );
    });
  }

  loadState() {
    this.http.find('state').subscribe((m) => {
      this.stateDetails = m;
    });
  }

  LoadAll() {
    this.loadState();
    this.LoadAllpersonnel();
  }

  createNew() {
    this.PersonnelRegisterForm.reset();
    this.firstShow = false;
    this.showSecond = true;
  }
  SendPassword(data: any) {
    const email = data.email;
    Swal.fire('Password Sent!', 'successfully to' + ' ' + email, 'success');
  }
  Backward() {
    this.firstShow = true;
    this.showSecond = false;
  }
  Edit(data: any) {
    this.PersonnelRegisterForm.patchValue({
      id: data._id,
    });
    console.log('reaching..', this.PersonnelRegisterForm.value);
    this.PersonnelRegisterForm.patchValue(data);
    this.firstShow = false;
    this.showSecond = true;
  }
  SubmitPersonnel() {
    this.PersonnelRegisterForm.patchValue({
      organizationId: this.organizationID,
    });
    const data = this.PersonnelRegisterForm.value;
    console.log('reaching..', data);
    if (data.id) {
      this.http.update('personnel', data.id, data).subscribe((n) => {
        Swal.fire('Success!', 'Update successfully.', 'success');
        this.PersonnelRegisterForm.reset();
        this.LoadAllpersonnel();
        this.firstShow = true;
        this.showSecond = false;
      });
    } else {
      this.http.create('personnel', data).subscribe((n) => {
        Swal.fire('Success!', 'successfully.', 'success');
        this.PersonnelRegisterForm.reset();
        this.LoadAllpersonnel();
        this.firstShow = true;
        this.showSecond = false;
      });
    }
  }
}
