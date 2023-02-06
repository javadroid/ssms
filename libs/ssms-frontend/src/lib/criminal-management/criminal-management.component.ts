import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import { environment } from '@env-api/environment'
import { Country, State, City }  from 'country-state-city';
import { LgaList } from '../shared/lga';
@Component({
  selector: 'ssms-criminal-management',
  templateUrl: './criminal-management.component.html',
  styleUrls: ['./criminal-management.component.css'],
})
export class CriminalManagementComponent implements OnInit {
  constructor(private http: ServiceApi) {}
  stepper = 0;
  createModal = false;
  countryCode=''
  case_modal = false;
  criminal_profile = false;
  suspect_list = false;
  fileData = new FormData();
  fileSelected!: File;
  criminalImg!: any;
  criminalData: any;
  criminalDatas: any;
  victimDatas:any;
  weapon = [] as any;
  vehicle = [] as any;
  media = [] as any;
  searchID=new FormControl('')

  crimeData = [] as any[];
  oneCrime: any;
  countryDetails: any[] = [];
  stateDetails: any[] = [];
  lgaDetails: any[] = [];
  imageurl = '';
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
    this.countryDetails= Country.getAllCountries()
    this.stateDetails  = State.getStatesOfCountry('NG')

  }

  onSearch() {
    if(this.searchID.value)
    this.http.findAny('criminal-info','nin',this.searchID.value).subscribe((e) => {
      this.criminalData = e;

      console.log("this.criminalData",this.criminalData)
      this.createModal = false;
      this.case_modal = false;
      this.criminal_profile = true;
      this.suspect_list = false;
      const crime=[] as any;
      for (let i = 0; i < e[0].caseId.length; i++) {

        this.http.findOne('crime-info',e[0].caseId[i]).subscribe(a=>{
          crime.push(a);
        })

      }
      this.crimeData=crime
    });
  }

  onCreate() {
    this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
      this.imageurl = uploadUrl[0];

      this.CriminalInfo.patchValue({
        image: this.imageurl,
      });

      this.http
        .create('criminal-info', this.CriminalInfo.value)
        .subscribe((e) => {
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
      console.log('size', 100 - size);
      return;
    }
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.criminalImg = reader.result;
    };
    console.log(this.fileSelected);

    this.fileData.append('file', this.fileSelected, this.fileSelected.name);
  }

  viewDetail(item: any) {
    this.case_modal = true;
    console.log(item);
    this.oneCrime=item
    const crime=[] as any;
    const victim=[] as any;
    for (let i = 0; i < item.criminalId.length; i++) {
      this.http.findOne('criminal-info',item.criminalId[i]).subscribe(e=> {
        crime.push(e);
      })
      this.criminalDatas=crime
    }

    for (let i = 0; i < item.victimId.length; i++) {
      this.http.findOne('criminal-info',item.victimId[i]).subscribe(e=> {
        victim.push(e);
      })
      this.victimDatas=victim
    }


    this.vehicle = item.evidence.filter((name: any) => {
      return name.name === 'Vehicle';
    });
    this.weapon = item.evidence.filter((name: any) => {
      return name.name === 'Weapon';
    });
    // console.log(this.crime);
    let s = [] as any;
    for (let i = 0; i < item.media.length; i++) {
      s = {
        image: item.media[i],
        name: item.media[i].split(`${environment.apiLink}/document/`)[1],
      };
      this.media.push(s);

    }
  }

  onCountryChange(event: any) {
    // this.loadstate(event.value);
this.countryCode = event.value.split(',')[0]
    this.stateDetails  = State.getStatesOfCountry(event.value.split(',')[0])
    console.log(event.value,  this.stateDetails)
  }

  onStateChange(event: any) {
    // this.loadLGA(event.value);

    let state =event.value.split(',')[0]
    const stateCode =event.value.split(',')[1]

    if(this.countryCode==='NG' ||this.countryCode===''){

      if(state==="Abuja Federal Capital Territory"){
        state ="FCT"
     }
      //@ts-ignore
      this.lgaDetails=LgaList[state]

    }else{

      this.lgaDetails = City.getCitiesOfState(this.countryCode,stateCode)

 const lgaDetail=[]
      // this.lgaDetails.forEach((city) =>{this.lgaDetails=city.name})
      for (let i = 0; i < this.lgaDetails.length; i++) {

        lgaDetail.push(this.lgaDetails[i].name)
      }
      this.lgaDetails=lgaDetail


    }
    console.log(stateCode, this.lgaDetails,state)


  }
}
