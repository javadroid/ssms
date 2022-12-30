import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  step='TYPE'
  pickone=''
  addreport=''
reportType=[] as any
reportCategories=[] as any
state=[] as any[]
lga=[] as any[]
 url = []as any[];
reportForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  details: new FormControl('', []),
  location: new FormControl('', []),
  state: new FormControl('', []),
  media:new FormControl(  ),
  reportType:new FormControl( []),
  lga: new FormControl('', []),
  phone: new FormControl('', []),
  email: new FormControl('', []),
});
fileData = new FormData();
  ngOnInit(): void {
    this.http.find('state').subscribe(e=>{
this.state=e
    })

    this.http.find('lga').subscribe(e=>{
      this.lga=e
    })
  }

  reporttype(type:string){
this.pickone=type

    if(type==='Crime'){
      this.reportCategories=[
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
    }else if(type==='Emergency'){
      this.reportCategories=[
        'fire',
        'flood',
        'climate change',
        'accident',
        'crashes',
        'active shooter',
        'terrorism',
        'war',
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

}
