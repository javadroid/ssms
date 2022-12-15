import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import { Router } from '@angular/router';
import StateLGA from './state_lgas';
import Swal from 'sweetalert2';

@Component({
  selector: 'ssms-criminal-info',
  templateUrl: './criminal-info.component.html',
  styleUrls: ['./criminal-info.component.css'],
})
export class CriminalInfoComponent implements OnInit {
  criminalInfoForm!: FormGroup;
  stepper=0
  stepperbtnactive=false;
  createModal=false

  state:any = StateLGA;
  filteredState:any;
  lgaselector: any;
  stateselector: any;
  allState:any = [];
  edits!: boolean;
  images: any;
  criminalID: any;
  profileSelected!: File;
  fileData = new FormData();
  profilePics!: string | ArrayBuffer | null;
  selectindex!: any;
  showfiltercriteria = false;
  criminalData: any;
  showFilter = false;

  constructor(private fb: FormBuilder, private http:ServiceApi, private router: Router) {}

  ngOnInit(): void {
    this.LoadAll();
    for(const data in this.state){
      this.allState.push(data);
    }
    this.criminalInfoForm = this.fb.group({
      crimeId: [''],
      firstName: [''],
      lastName: [''],
      middleName: [''],
      phoneNumber: [''],
      email: [''],
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
      id: ['']
    })
  }

  LoadAll() {
    this.http.find('criminal-info').subscribe((m) => {
      this.criminalData = m;
    });
  }

  getLga(state:any) {
      this.filteredState = this.state[state]
    console.log('states::', this.state[state]);
  }

  showFilterList() {
    this.showFilter = !this.showFilter;
  }

  Backward() {
    this.edits = false;
    // this.showViewDetails = false;
    // this.edits=false
  }

  createNew() {
    this.criminalInfoForm.reset();
    this.edits = true;
    this.createModal = true;
  }

  cancelCreate(){
    this.createModal = false;
    this.edits = false;
    this.createModal = false;
  }

  uploadProfile(event: any): void {
    this.profileSelected = event.target.files[0];
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
      this.profilePics = reader.result;
    };
    console.log(this.profileSelected);

    this.fileData.append('file', this.profileSelected, this.profileSelected.name);
  }

  showmenu(index: any) {
    this.selectindex = index;
    console.log('selected', this.selectindex, index);
    if (index === this.selectindex) {
      this.showfiltercriteria = !this.showfiltercriteria;
    }
  }

  Edit(data: any) {
    this.criminalInfoForm.patchValue({
      id: data._id,
    });
    console.log('reaching..', this.criminalInfoForm.value);
    this.criminalInfoForm.patchValue(data);
    this.profilePics = data.profilePic;

    this.selectindex = null;
    this.edits = true;
    this.LoadAll();

  }

  onDelete(item: any) {
    this.http.delete('criminal-info', item._id).subscribe((e) => {
      Swal.fire(
        'Deleted!',
         e.phoneNumber,
        'success'
      );
    });

     this.LoadAll();
  }

  saveCriminalInfoForm(){
    const data = this.criminalInfoForm.value;

    if (data.id) {
      this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
        this.images = uploadUrl[0];
        data.profilePic = this.images;

        console.log('path1:', data);
        this.http.update('criminal-info', data.id, data).subscribe((n) => {
          Swal.fire('Success!', 'Update successfully.', 'success');
          this.criminalInfoForm.reset();
          this.router.navigate(['/criminal-info']);
        });
      });
    } else {
      this.http.upload('criminal-info', this.fileData).subscribe((uploadUrl) => {
        this.images = uploadUrl[0];

        this.criminalInfoForm.value.profilePic = this.images;
        this.http.create('criminal-info', data).subscribe((n) => {
          Swal.fire('Success!', 'successfully.', 'success');
          this.criminalInfoForm.reset();
          this.router.navigate(['/criminal-info']);
        });
      });
    }
  }



}
