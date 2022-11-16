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
      this.reportTime=['murder','robbery',]
    }else if(value.toLowerCase()==='emergency'){
      this.reportTime=['fire','flood',]
    }else if(value.toLowerCase()==='others'){
      this.reportTime=['fire','xassa',]
    } else this.reportTime=[]

    console.log(this.reportTime.length)
	}
}

