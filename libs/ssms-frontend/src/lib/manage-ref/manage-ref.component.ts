import { Component, OnInit } from '@angular/core';
import { ServiceApi } from '../shared/service/service-api';
import { FormControl, FormGroup } from '@angular/forms';
import { Country, State, City }  from 'country-state-city';
import { LgaList } from '../shared/lga';


@Component({
  selector: 'ssms-manage-ref',
  templateUrl: './manage-ref.component.html',
  styleUrls: ['./manage-ref.component.css'],
})
export class ManageRefComponent implements OnInit {
  constructor(private http: ServiceApi) {}
  branch = [] as any;
  department = [] as any;
  countryCode=''
  division = [] as any;
  organizationCategory = [] as any;
  organizationName = [] as any;
  policy = [] as any;
  rank = [] as any;
  station = [] as any;
  organizationData=[]as any[]
  crimetype=[]as any[]
  countryDetails: any[] = [];
  stateDetails: any[] = [];
  lgaDetails: any[] = [];
 section=['branch', 'department', 'division', 'organizationCategory', 'policy','rank', 'station', 'organizationName','crimetype']
  show='branch'

  Form = new FormGroup({
    subscriberId: new FormControl(''),
    branchName: new FormControl(''),
    divisionName: new FormControl(''),
    departmentName: new FormControl(''),
    policy: new FormControl(''),
    state: new FormControl(''),
    lga: new FormControl(''),
    country: new FormControl('Nigeria'),
    crimetype: new FormControl(''),
    rank: new FormControl(''),
    stationName: new FormControl(''),
    organizationCategoryName: new FormControl(''),
    organizationName: new FormControl(''),
  });

  ngOnInit(): void {
    this.http.find('organizationName').subscribe(e=>{this.organizationName=e })
    this.http.find('organizationCategory').subscribe(e=>{this.organizationCategory=e })

    this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })

    // this.show.toLocaleUpperCase()
    this.http.find('crime-type').subscribe(e=>{this.crimetype=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('branch').subscribe(e=>{this.branch=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('division-info').subscribe(e=>{this.division=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('department').subscribe(e=>{this.department=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('policy').subscribe(e=>{this.policy=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('rank').subscribe(e=>{this.rank=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('station').subscribe(e=>{this.station=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.countryDetails= Country.getAllCountries()
    this.stateDetails  = State.getStatesOfCountry('NG')

  console.log(" this.countryDetails", this.countryDetails)
  }

  onselect(event:any){
    this.show=event.target.value

    console.log(event.target.value)
  }
  createbranch() {
     this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
    this.http.create('branch', this.Form.value).subscribe((e) => {

      console.log(e)
      this.ngOnInit();
    });
  }

  createcrimetype() {
    this.Form.patchValue({
     subscriberId:this.organizationData[0]._id
   })
   this.http.create('crime-type', this.Form.value).subscribe((e) => {

     console.log(e)
     this.ngOnInit();
   });
 }

  createstation() {
     this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
    this.http.create('station', this.Form.value).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  createrank() {
     this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
    this.http.create('rank', this.Form.value).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }
  createpolicy() {
     this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
    this.http.create('policy', this.Form.value).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }
  createorganizationName() {

    this.http.create('organizationName', this.Form.value).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  createorganizationCategory() {

    this.http.create('organizationCategory', this.Form.value).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
[0]  }

  createdivision() {
     this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
    this.http.create('division-info', this.Form.value).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }
  createdepartment() {
     this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
    this.http.create('department', this.Form.value).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  deletebranch(id:string) {
    this.http.delete('branch', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  deletecrimetype(id:string) {
    this.http.delete('crime-type', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  deletestation(id:string) {
    this.http.delete('station', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  deleterank(id:string) {
    this.http.delete('rank', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }
  deletepolicy(id:string) {
    this.http.delete('policy', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }
  deleteorganizationName(id:string) {
    this.http.delete('organizationName', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  deleteorganizationCategory(id:string) {
    this.http.delete('organizationCategory', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  deletedivision(id:string) {
    this.http.delete('division-info', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }
  deletedepartment(id:string) {
    this.http.delete('department', id).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  onStateChange(event: any) {
    // this.loadLGA(event.value);
    this.Form.patchValue({state:event.value.split(',')[0]})
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
  onCountryChange(event: any) {
    // this.loadstate(event.value);
    this.Form.patchValue({country:event.value.split(',')[1]})
this.countryCode = event.value.split(',')[0]
    this.stateDetails  = State.getStatesOfCountry(event.value.split(',')[0])
    console.log(event.value,  this.stateDetails)
  }
  // loadstate(stateId: any) {
  //   this.http.find('lga').subscribe((m) => {
  //     this.lgaDetails = m.filter(
  //       (n: { stateId: any }) => n.stateId === stateId
  //     );
  //     console.log('state', this.stateDetails);
  //   });
  // }
  // loadLGA(stateId: any) {
  //   this.http.find('lga').subscribe((m) => {
  //     this.lgaDetails = m.filter(
  //       (n: { stateId: any }) => n.stateId === stateId
  //     );
  //     console.log('state', this.stateDetails);
  //   });
  // }

  getLocation(){

    console.log('pass');
     }
}
