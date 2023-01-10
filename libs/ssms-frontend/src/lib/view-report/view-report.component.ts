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
  personnelData = [] as any[];
  isRelate=false
  reportType=[] as any
  reports=[] as any
  report=[] as any

  ngOnInit(): void {
    this.http.find('report').subscribe((e) => {
      // this.http.find('crime-type').subscribe((a) => {
      //   const crime_type = a.filter((id: any) => {
      //     return id.subscriberId === this.personnelData[0].organizationId;
      //   });

      //   for (let i = 0; i < e.reportType.length; i++) {
      //      this.isRelate = e.reportType.some((item:any) => crime_type.includes(item))
      //   }


      //     for (let j = 0; j < a.crimetype.length; j++) {

      //       this.reportType.push(e.reportType.includes(a.crimetype[e]))
      //     }

      //     console.log(this.isRelate,this.reportType)




      // });
      this.reports=e


    });
  }

  ShowView(item:any){
    this.showList = false;
    this.showView = true;

    this.report=item
  }
}
