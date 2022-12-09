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
  lgaDetails: any[] = [];
  departmentDetails: any[] = [];
  branchDetails: any[] = [];
  fileData = new FormData();
  fileSelected!: File;
  images!: string;
  personnelImag!: any;
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
      personnelImage: [''],
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
  loadDepartment() {
    this.http.find('department').subscribe((m) => {
      this.departmentDetails = m.filter(
        (n: { organizationId: string }) =>
          n.organizationId === this.organizationID
      );
    });
  }
  loadBanch() {
    this.http.find('branch').subscribe((m) => {
      this.branchDetails = m.filter(
        (n: { organizationId: string }) =>
          n.organizationId === this.organizationID
      );
    });
  }
  loadState() {
    this.http.find('states').subscribe((m) => {
      console.log('state', m);
      this.stateDetails = m;
    });
  }
  onStateChange(event: any) {
    this.loadLGA(event.value);
  }
  loadLGA(stateId: any) {
    this.http.find('lga').subscribe((m) => {
      this.lgaDetails = m.filter(
        (n: { stateId: any }) => n.stateId === stateId
      );
      console.log('state', this.stateDetails);
    });
  }
  LoadAll() {
    this.loadState();
    this.LoadAllpersonnel();
    this.loadDepartment();
    this.loadBanch();
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
    this.personnelImag = data.personnelImage;
    this.firstShow = false;
    this.showSecond = true;
  }

  upload(event: any): void {
    this.fileSelected = event.target.files[0];
    const reader = new FileReader();
    // this.personnelImag = reader.result;
    const size = Math.round(event.target.files[0].size / 1024);
    if (size > 100) {
      Swal.fire(
        'Warning!',
        `The passport exceeded the maximum size, you provided ${size} KB, and the required size is 100 KB`,
        'warning'
      );
      return;
    }
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.personnelImag = reader.result;
    };
    console.log(this.fileSelected);

    this.fileData.append('file', this.fileSelected, this.fileSelected.name);
  }

  SubmitPersonnel() {
    let path = '';

    console.log(this.PersonnelRegisterForm.value);
    const data = this.PersonnelRegisterForm.value;

    if (data.id) {
      this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
        this.images = uploadUrl[0];
        data.personnelImage = this.images;
        data.organizationId = this.organizationID;

        console.log('path1:', data);
        this.http.update('personnel', data.id, data).subscribe((n) => {
          Swal.fire('Success!', 'Update successfully.', 'success');
          this.PersonnelRegisterForm.reset();
          this.LoadAllpersonnel();
          this.firstShow = true;
          this.showSecond = false;
        });
      });
    } else {
      this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
        this.images = uploadUrl[0];

        this.PersonnelRegisterForm.value.personnelImage = this.images;
        this.PersonnelRegisterForm.value.organizationId = this.organizationID;
        this.http.create('personnel', data).subscribe((n) => {
          Swal.fire('Success!', 'successfully.', 'success');
          console.log(n);
          this.PersonnelRegisterForm.reset();
          this.LoadAllpersonnel();
          this.firstShow = true;
          this.showSecond = false;
        });
      });
    }
  }
}
