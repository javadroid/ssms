import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-criminal-management',
  templateUrl: './criminal-management.component.html',
  styleUrls: ['./criminal-management.component.css'],
})
export class CriminalManagementComponent implements OnInit {
  constructor(private http:ServiceApi) {}
  stepper = 0;
  createModal = false;
  case_modal=true
  criminal_profile=false
  fileData = new FormData();
  fileSelected!:File
  criminalImg!:any
  criminalData:any
  crimeData=[] as any[]
  oneCrime:any
  suspect_list=true

  imageurl=''
  CriminalInfo = new FormGroup({
    dateOfBirth: new FormControl(),

    firstName: new FormControl(),
    lastName: new FormControl(),
    middleName: new FormControl(),
    occupation: new FormControl(),
    nin: new FormControl(),
    gender: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    birthPlace: new FormControl(),
    image: new FormControl(),
    height: new FormControl(),
    weight: new FormControl(),
    eyeColor: new FormControl(),
    hairColor: new FormControl(),
    address: new FormControl(),
    biometrics: new FormControl(),
    lga: new FormControl(),
    state: new FormControl(),

    lgaOfOrigin: new FormControl(),
    stateOfOrigin: new FormControl(),
    countryOfOrigin: new FormControl(),
    postalCode: new FormControl(),

    education: new FormControl(),
    alias: new FormControl(),
  });

  ngOnInit(): void {
    this.CriminalInfo.patchValue({});

  }

  onCreate() {

    this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
      this.imageurl = uploadUrl[0];


      this.CriminalInfo.patchValue({
        image:this.imageurl,

      })


    this.http.create('criminal-info',this.CriminalInfo.value).subscribe(e=>{
      this.createModal = false;
      console.log(e);

        this.CriminalInfo.reset();

      });
    });


  }

  upload(event: any): void {
    this.fileSelected = event.target.files[0];
    const reader = new FileReader();
    const size = Math.round(event.target.files[0].size / 1024);
    if (size > 100) {
    console.log('size',100-size )
      return;
    }
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.criminalImg = reader.result;
    };
    console.log(this.fileSelected);

    this.fileData.append('file', this.fileSelected, this.fileSelected.name);
  }

  viewDetail(item: any){
    this.case_modal=true;
console.log(item)
this.crimeData.length
  }


}
