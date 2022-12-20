import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import { Router } from '@angular/router';
import StateLGA from './state_lgas';
import Swal from 'sweetalert2';
import Country from './country_state';

@Component({
  selector: 'ssms-criminal-management',
  templateUrl: './criminal-management.component.html',
  styleUrls: ['./criminal-management.component.css'],
})
export class CriminalManagementComponent implements OnInit {
  criminalInfoForm!: FormGroup;
  stepper = 0;
  createModal = false;
  state:any = StateLGA;
  country:any = Country;
  case_modal=true
  criminal_profile = false;
  fileData = new FormData();
  fileSelected!:File;
  filteredState:any;
  lgaselector: any;
  stateselector: any;
  allState:any = [];
  allCountries:any = [];
  edits!: boolean;
  images: any;
  criminalImg!:any;
  criminalData:any;
  crimeData=[] as any[];
  oneCrime:any;
  selectindex!: any;
  showfiltercriteria = false;
  showFilter = false;

  imageurl='';
  criminalRecord: any;
  filteredStateOrigin: any;
  filteredCriminalData: any;

  constructor(private fb: FormBuilder, private http:ServiceApi, private router: Router) {}

  ngOnInit(): void {
    this.LoadAll();

    for(const data in this.country){
      this.allCountries.push(data);
    }
    this.criminalInfoForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      phone: [''],
      email: [''],
      dateOfBirth: [''],
      address: [''],
      birthPlace: [''],
      image: [''],
      eyeColor: ['#000000'],
      gender: [''],
      hairColor: ['#000000'],
      countryOfOrigin: [''],
      stateOfOrigin: [''],
      lgaOfOrigin: [''],
      occupation: [''],
      postalCode: [''],
      education: [''],
      biometrics: [''],
      nin: [''],
      state: [''],
      lga: [''],
      height: [''],
      weight: [''],
      caseFileId: [''],
      alias: [''],
      id: ['']
    })
  }

  LoadAll() {
    this.http.find('criminal-info').subscribe((m) => {
      this.criminalData = m;
      this.filteredCriminalData = m;
    });
  }

  selectedCountry(country: any){
    if(country){
        for(const data in this.state){
        this.allState.push(data);
      }
    }
  }

  getOriginLga(state:any) {
    console.log("state of origin", this.state);
      this.filteredStateOrigin = this.state[state]
  }

  getLga(state:any) {
      this.filteredState = this.state[state]
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
    this.criminalInfoForm.patchValue(data);
    this.criminalImg = data.image;
    console.log('reaching..222', this.criminalInfoForm.value);
    if(data.countryOfOrigin){
        for(const state in this.state){
        this.allState.push(state);
        this.filteredStateOrigin = this.state[data.stateOfOrigin]
      }
    }
    if(data.state){
      // for(const state in this.state){
        // this.allState.push(state);
        this.filteredState = this.state[data.state]
      // }
    }
    this.selectindex = null;
    this.createModal = true;
    this.edits = true;
    this.LoadAll();

  }

  onView(item: any){
    console.log("items::", item);
    this.criminal_profile = true;
    this.criminalRecord = item;
  }

  onDelete(item: any) {
    this.http.delete('criminal-info', item._id).subscribe((e) => {
      Swal.fire(
        'Deleted!',
         e.phone,
        'success'
      );
    });

     this.LoadAll();
  }

  closeCriminal(){
    this.criminal_profile = false;
  }

  saveCriminalInfoForm() {
    const data = this.criminalInfoForm.value;

    if(data.id){
      this.http.update('criminal-info', data.id, data).subscribe((n) => {
        this.createModal = false;
        this.edits = false;
        console.log('update::', n);
        Swal.fire('Success!', 'Update successfully.', 'success');
        this.criminalInfoForm.reset();
        // this.router.navigate(['/criminal-info']);
      });
    } else {
      console.log('create::', this.fileData, this.criminalImg);

      this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
        this.imageurl = uploadUrl[0];
    
        this.criminalInfoForm.patchValue({
          image:this.imageurl,
        });
  
      this.http.create('criminal-info', this.criminalInfoForm.value).subscribe(e=>{
        this.createModal = false;
        this.edits = false;
          Swal.fire('Success!', 'Update successfully.', 'success');
          this.criminalInfoForm.reset();
        });
      });
    }
  
  }

  upload(event: any): void {
    this.fileSelected = event.target.files[0];
    const reader = new FileReader();
    const size = Math.round(event.target.files[0].size / 1024);
    if (size > 100) {
    console.log('size',100-size )
      Swal.fire(
        'Warning!',
        `The passport exceeded the maximum size, you provided ${size} KB, and the required size is 100 KB`,
        'warning'
      );
      return;
    }
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.criminalImg = reader.result;
    };
    console.log(this.fileSelected);

    this.fileData.append('file', this.fileSelected, this.fileSelected.name);
  }

  searchItem(item:any){
    console.log('searched item::', item)
    if(item.length == -1){
      return this.filteredCriminalData = this.criminalData;
    }
      return this.filteredCriminalData = this.criminalData.filter((n:any) => n.firstName.includes(item) || n.lastName.includes(item));
  }

  viewDetail(item: any){
    this.case_modal=true;
    console.log(item)
    this.crimeData.length
  }


}
