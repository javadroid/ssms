/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
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

  reportTime = [] as any[];
  ngOnInit(): void {}
  selectedTeam = '';
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos?: Observable<any>;


 selectFiles(event:any): void{
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;

  if(this.selectedFiles) {
    for(let i=0; i < this.selectedFiles.length; i++){
      this.message.push(this.selectedFiles[i].name) 

    }
  }
 }
  
 uploadFiles(): void{
  this.message = [];

  if(this.selectedFiles) {
    for(let i=0; i < this.selectedFiles.length; i++){
      this.upload(i, this.selectedFiles[i]);

    }
  }
 }
upload(idx: number, file:File):void{
  this.progressInfos[idx] = {value: 0, fileName:file.name};

  if(file){
    const formdata=new FormData()
formdata.append('file',file,file.name)
    this.http.upload("report",formdata).subscribe(e=>{
      console.log(e)
    }
    
    )
  }
}

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
    this.uploadFiles()

  }




}
