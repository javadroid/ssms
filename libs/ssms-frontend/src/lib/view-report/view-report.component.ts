import { Component, OnInit } from '@angular/core';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css'],
})
export class ViewReportComponent implements OnInit {
  constructor(private http: ServiceApi) {}
  showList = true;
  showView = false;

  personnelData=[] as any
  organizationData=[] as any
  isRelate=false
  reportType=[] as any
  reports=[] as any
  report=[] as any
  personneldetails=[] as any
  ngOnInit(): void {

    const type=localStorage.getItem("@isPersonnel")
    const p=localStorage.getItem("@personnel")
    const o=localStorage.getItem("@organization")
    if(p&&o){
    this.personnelData=[JSON.parse(p)]
    this.organizationData=[JSON.parse(o)]
    }

    if(type==="true"){
      this.http.find('report').subscribe((e) => {
        console.log(e,this.personnelData,this.organizationData)
        this.reports=e.filter((id:any)=> id.personnel===this.personnelData[0]._id)
      });
    }else{
      this.http.find('report').subscribe((e) => {
        this.reports=e.filter((id:any)=> id.organization===this.organizationData[0]._id)
      });
    }


  }

  ShowView(item:any){
    this.showList = false;
    this.showView = true;

    this.report=item

    this.http.findOne("personnel",item.personnel).subscribe(e=>{
      this.personneldetails=e
    })
  }
}
