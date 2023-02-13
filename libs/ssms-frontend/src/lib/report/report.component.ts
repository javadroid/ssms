import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { LgaList } from '../shared/lga';


@Component({
  selector: 'ssms-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  constructor(private http:ServiceApi, private route:Router) {}
  progressInfos!:any
  selectedFiles!:any
  message!:any
  personnel=[]as any
  step='TYPE'
  pickone=''
  isselectBranch=''
  countryCode=''
  GPSlocation:any[]=[]
  getlocated=''
  addreport=''
  countryDetails: any[] = [];
  stateDetails: any[] = [];
  lgaDetails: any[] = [];
  orgBranchDetails=[]as any;
reportType=[] as any
reportCategories=[] as any
state=[] as any[]
lga=[] as any[]
 url = []as any[];
reportForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  details: new FormControl('', []),
  location: new FormControl('', []),
  GPSlocation: new FormControl(),
  state: new FormControl('', []),
  media:new FormControl(  ),
  country: new FormControl('Nigeria'),
  reportType:new FormControl( []),
  lga: new FormControl('', []),
  phone: new FormControl('', []),
  email: new FormControl('', []),
  personnel: new FormControl('', []),
  organization: new FormControl('', []),
});
fileData = new FormData();
isorgBranchDetails=false;
  ngOnInit(): void {
    // console.log("dd",this.location.length)
    this.getlocated=this.GPSlocation.length ===0? 'Please allow us locate you':'Location Captured✅'

    this.countryDetails= Country.getAllCountries()
    this.stateDetails  = State.getStatesOfCountry('NG')

  }

  reporttype(type:string){
this.pickone=type

    if(type==='Crime'){
      this.reportCategories=[
        'Murder',
        'Robbery',
        'Theft',
        'Rape',
        'Financial Fraud',
        'Assault',
        'Kidnap',
        'Corruption',
        'Overspeeding',
        'Drinking while Driving',
        'Intrusion',
        'Trespass',
        'Drug Abuse'
      ];
    }else if(type==='Emergency'){
      this.reportCategories=[
        'Fire',
        'Flood',
        'Climate Change',
        'Accident',
        'Crashes',
        'Active Shooter',
        'Terrorism',
        'War',
      ];
    }
  }

  addreportCategories(item:any){

    if(this.reportType.includes(item)){
      this.reportType= this.reportType.filter((e:any) => e !== item);
    }else if(!this.reportType.includes(item)){
      this.reportType.push(item)
      this.addreport=item
      this.reportForm.patchValue({reportType:this.reportType})
    console.log("this.reportType",this.reportType)
    }

  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.message.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
      this.reportForm.patchValue({media:this.url})
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      const formdata = new FormData();
      formdata.append('file', file, file.name);

      this.http.upload('document', formdata).subscribe((e:any) => {
        this.url.push(e[0])

      });
    }
  }

  onSubmit(){

    this.uploadFiles();
    console.log(this.reportForm.value);
    this.http.create('report', this.reportForm.value).subscribe((e) => {
      console.log("report",e);
      Swal.fire('Reported successfully!', 'please hold for a response ' , 'success');
      this.route.navigate(['../index']);
    });

  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(location => {
      this.GPSlocation=[location.coords]
      this.isorgBranchDetails=true
      this.getlocated='Location Captured✅'
      this.reportForm.patchValue({GPSlocation:this.GPSlocation})
       console.log( this.GPSlocation)
    })
  }

  onCountryChange(event: any) {
    // this.loadstate(event.value);
    this.reportForm.patchValue({country:event.value.split(',')[1]})
this.countryCode = event.value.split(',')[0]
    this.stateDetails  = State.getStatesOfCountry(event.value.split(',')[0])
    console.log(event.value,  this.stateDetails)
  }

  onStateChange(event: any) {
    // this.loadLGA(event.value);
    this.reportForm.patchValue({ state: event.value.split(',')[0] });
    let state = event.value.split(',')[0];
    const stateCode = event.value.split(',')[1];
    if (this.countryCode === 'NG' || this.countryCode === '') {
      if (state === 'Abuja Federal Capital Territory') {
        state = 'FCT';
      }
      //@ts-ignore
      this.lgaDetails = LgaList[state];
    } else {
      this.lgaDetails = City.getCitiesOfState(this.countryCode, stateCode);

      const lgaDetail = [];
      // this.lgaDetails.forEach((city) =>{this.lgaDetails=city.name})
      for (let i = 0; i < this.lgaDetails.length; i++) {
        lgaDetail.push(this.lgaDetails[i].name);
      }
      this.lgaDetails = lgaDetail;
    }
    console.log(stateCode, this.lgaDetails, state);
  }

  getBranch(){

    this.isorgBranchDetails=true
    let personnel=[]as any
    let branch=[]as any
    let crime_type=[] as any

    this.http.find("crime-type").subscribe(e=>{
      for (let i = 0; i < this.reportType.length; i++) {
        crime_type.push(e.filter((type: any) => type.crimetype.includes(this.reportType[i])))

      }

      for (let i = 0; i < crime_type.length; i++) {
      //  if(crime_type[i].subscriberId!==crime_type[i].subscriberId)
        console.log(crime_type[i][0])
        if(crime_type[i][0]?.subscriberId){
          this.http.findOne("organization",crime_type[i][0]?.subscriberId).subscribe(a=>{
            this.http.find("personnel").subscribe(p=>{
              personnel=p.filter((type: any) => type.organizationId===a._id)
              this.http.find("branch").subscribe(b=>{
                branch= b.filter(
                  (type: any) =>
                    type.subscriberId===a._id &&
                    type.country===this.reportForm.value.country &&
                    type.state===this.reportForm.value.state &&
                    type.lga===this.reportForm.value.lga )
                    console.log("personnel1",personnel)
                    for (let j = 0; j < personnel.length; j++) {
                      for (let k = 0; k < branch.length; k++) {
                        if(personnel[j].branch===branch[k].branchName){
                          personnel[j]['organization']=a
                          personnel[j]["branchDetails"]=branch[k]
                            console.log("personnel",personnel[j])
                           this.personnel.push(personnel[j])

                        }
                      }
                    }

              })

            })
          })


        }


      }

    })

  }

  selectBranch(item:any){
    this.isselectBranch=item._id
    this.reportForm.patchValue({personnel:item._id ,organization:item.organization._id})
    console.log(this.reportForm.value)
  }

}
