import { Component, Input, OnInit } from '@angular/core';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  constructor(private http:ServiceApi) {}

  @Input() ID=''

  totalReports=0
  totalPersonnel=0
  totaldDistricts=0
  totalCasefiles=0
  organizationData=[] as any[]

  ngOnInit(): void {
    this.http.find('branch').subscribe((e:any[])=>{this.totaldDistricts=e.filter((id:any)=>{ return id.subscriberId===this.organizationData[0]._id}).length; })
    this.http.find('personnel').subscribe((m) => {
      this.totalPersonnel = m.filter(
        (n: { organizationId: string }) =>
          n.organizationId ===this.organizationData[0]._id).length
  });
    this.http.find('crime-info').subscribe((e:any[])=>{this.totalCasefiles=e.filter((id:any)=>{ return id.subscriberId===this.organizationData[0]._id}).length; })
    this.http.find('report').subscribe((e:any[])=>{this.totalReports=e.filter((id:any)=> id.organization===this.organizationData[0]._id).length; })

  }
}
