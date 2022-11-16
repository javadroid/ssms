/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ssms-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css'],
})
export class NewReportComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  reportTime=[]as any[]
  selectedTeam = '';

	onSelected(value:string): void {
		this.selectedTeam = value;
    if(value.toLowerCase()==='crime'){
      this.reportTime=['murder','robbery', 'theft', 'rape', 'fraud', 'assault', 'kidnap', 'impersonation', 'overspeeding', 'drinking while driving', 'intrusion', 'trespass',]
    }else if(value.toLowerCase()==='emergency'){
      this.reportTime=['fire','flood','climate change', 'accident', 'crashes', 'active shooter','terrorism', 'war',]
    }else if(value.toLowerCase()==='others'){
      this.reportTime=['fire','xassa',]
    } else this.reportTime=[]

    console.log(this.reportTime.length)
	}
}

