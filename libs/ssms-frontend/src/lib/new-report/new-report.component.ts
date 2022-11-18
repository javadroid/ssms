/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css'],
})
export class NewReportComponent implements OnInit {
  reportForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    reportType: new FormControl('Report Type',[]),
    reportCategory: new FormControl('Report Category',[]),
    details: new FormControl('',[]),
    location: new FormControl('',[]),

  });

  fileData=new FormData()


  constructor(private http:ServiceApi) {
    console.log(this.reportForm.controls.title);
  }

  ngOnInit(): void {}
  reportTime = [] as any[];
  selectedTeam = '';
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  onSelected(value: string): void {
    this.selectedTeam = value;
    if (value.toLowerCase() === 'crime') {
      this.reportTime = [
        'murder',
        'robbery',
        'theft',
        'rape',
        'fraud',
        'assault',
        'kidnap',
        'impersonation',
        'overspeeding',
        'drinking while driving',
        'intrusion',
        'trespass',
      ];
    } else if (value.toLowerCase() === 'emergency') {
      this.reportTime = [
        'fire',
        'flood',
        'climate change',
        'accident',
        'crashes',
        'active shooter',
        'terrorism',
        'war',
      ];
    } else if (value.toLowerCase() === 'others') {
      this.reportTime = ['fire', 'xassa'];
    } else this.reportTime = [];

    console.log(this.reportTime.length);
  }

  onSubmit(){
    this.http.create('report',this.reportForm.value).subscribe(e=>{
      console.log(e)
    })

  }


  upload(file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });


  }

  selectFiles(event:any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  onFileSelect(){

    // this.fileData.append("uploads[]",)

console.log(this.fileData)

  }
}
