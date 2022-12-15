import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import StateLGA from './state_lgas';
import swal from 'sweetalert2';

@Component({
  selector: 'ssms-criminal-info',
  templateUrl: './criminal-info.component.html',
  styleUrls: ['./criminal-info.component.css'],
})
export class CriminalInfoComponent implements OnInit {
  criminalInfoForm!: FormGroup;
  stepper=true;
  stepperbtnactive=false;

  state:any = StateLGA;
  filteredState:any;
  lgaselector: any;
  stateselector: any;
  allState:any = [];
  formList!: boolean;
  fileData = new FormData();
  fileSelected!: File;
  images: any;
  criminalID: any;
  profilePics!: string | ArrayBuffer | null;

  constructor(private fb: FormBuilder, private http:ServiceApi) {}

  ngOnInit(): void {
    for(const data in this.state){
      this.allState.push(data);
    }
    this.criminalInfoForm = this.fb.group({
      crimeId: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
      placeOfBirth: [''],
      stateOfOrigin: [''],
      lgaOfOrigin: [''],
      occupation: [''],
      locationId: [''],
      education: [''],
      biometrics: [''],
      profilePic: [''],
      nin: [''],
      height: [''],
      weight: [''],
      caseFileId: [''],
      aliases: [''],
    })
  }

  getLga(state:any) {
      this.filteredState = this.state[state]
    console.log('states::', this.state[state]);
  }

  saveCriminalInfoForm(){
    const data = this.criminalInfoForm.value;

    if (data.id) {
      this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
        this.images = uploadUrl[0];
        data.profilePic = this.images;
        data.crimeId = this.criminalID;

        console.log('path1:', data);
        this.http.update('criminal-info', data.id, data).subscribe((n) => {
          swal.fire('Success!', 'Update successfully.', 'success');
          this.criminalInfoForm.reset();
          // this.LoadAllpersonnel();
          // this.firstShow = true;
          // this.showSecond = false;
        });
      });
    } else {
      this.http.upload('criminal-info', this.fileData).subscribe((uploadUrl) => {
        this.images = uploadUrl[0];

        this.criminalInfoForm.value.profilePic = this.images;
        this.criminalInfoForm.value.crimeId = this.criminalID;
        this.http.create('criminal-info', data).subscribe((n) => {
          swal.fire('Success!', 'successfully.', 'success');
          console.log(n);
          this.criminalInfoForm.reset();
          // this.LoadAllpersonnel();
          // this.firstShow = true;
          // this.showSecond = false;
        });
      });
    }

    // this.http.create('criminal-info', data).subscribe(dt => {
    //   swal.fire(
    //     'Successful!',
    //     'Your Request has been Saved successful!',
    //     'success'
    //   );
    // });

    // this.http.create('criminal-info', data).subscribe(dt => {
    //   swal.fire(
    //     'Successful!',
    //     'Your Request has been Saved successful!',
    //     'success'
    //   );
    // });
  }

  upload(event: any): void {
    this.fileSelected = event.target.files[0];
    const reader = new FileReader();
    // this.personnelImag = reader.result;
    const size = Math.round(event.target.files[0].size / 1024);
    if (size > 100) {
      swal.fire(
        'Warning!',
        `The passport exceeded the maximum size, you provided ${size} KB, and the required size is 100 KB`,
        'warning'
      );
      return;
    }
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.profilePics = reader.result;
    };
    console.log(this.fileSelected);

    this.fileData.append('file', this.fileSelected, this.fileSelected.name);
  }

}
