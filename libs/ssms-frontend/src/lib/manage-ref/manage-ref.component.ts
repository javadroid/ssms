import { Component, OnInit } from '@angular/core';
import { ServiceApi } from '../shared/service/service-api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ssms-manage-ref',
  templateUrl: './manage-ref.component.html',
  styleUrls: ['./manage-ref.component.css'],
})
export class ManageRefComponent implements OnInit {
  constructor(private http: ServiceApi) {}
  branch = [] as any;
  department = [] as any;
  division = [] as any;
  organizationCategory = [] as any;
  organizationName = [] as any;
  policy = [] as any;
  rank = [] as any;
  station = [] as any;
  organizationData=[]as any[]
 section=['branch', 'department', 'division', 'organizationCategory', 'policy','rank', 'station', 'organizationName']
  show='branch'

  Form = new FormGroup({
    subscriberId: new FormControl(''),
    branchName: new FormControl(''),
    divisionName: new FormControl(''),
    departmentName: new FormControl(''),
    policy: new FormControl(''),
    rank: new FormControl(''),
    stationName: new FormControl(''),
    organizationCategoryName: new FormControl(''),
    organizationName: new FormControl(''),
  });

  ngOnInit(): void {

    this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
    this.http.find('branch').subscribe(e=>{this.branch=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('division-info').subscribe(e=>{this.division=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('department').subscribe(e=>{this.department=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('policy').subscribe(e=>{this.policy=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('rank').subscribe(e=>{this.rank=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('station').subscribe(e=>{this.station=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('organizationName').subscribe(e=>{this.organizationName=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
    this.http.find('organizationCategory').subscribe(e=>{this.organizationCategory=e.filter((id:any)=>{ return id.subscriberId===this.Form.value.subscriberId}); })
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
     this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
    this.http.create('organizationName', this.Form.value).subscribe((e) => {
      console.log(e)
      this.ngOnInit();
    });
  }

  createorganizationCategory() {
     this.Form.patchValue({
      subscriberId:this.organizationData[0]._id
    })
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
}
