import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PolicyInfoService } from './policy-info.service';

@Component({
  selector: 'ssms-policy-info',
  templateUrl: './policy-info.component.html',
  styleUrls: ['./policy-info.component.css'],
})
export class PolicyInfoComponent implements OnInit {
  constructor(private http: PolicyInfoService){}
  ngOnInit(): void {
    this.find()

  }

  dataModel=[] as any[]
  key=[]as any[]
  keyValue=''
  updateInput=true
   find(value?:any){
     this.http.find('policy-info').subscribe((e)=>{
      this.dataModel=e
      this.key= Object.keys(this.dataModel.slice().shift())
      const toRemove=["updatedAt","_id","createdAt","__v"]
      this.key =this.key.filter( ( el ) => !toRemove.includes( el ) );
      if(value){
        this.dataModel=e.filter((field:any)=>{return field[this.keyValue].includes(value)})
      }
     })
  }

  updateMedel(id:string,update:any){
    this.http.update('policy-info',id,update).subscribe(e=>{
      console.log(e)
    })
  }

  update(value:any){
    const content=document.getElementsByClassName(value.target.attributes['ng-reflect-ng-class'].value);

    console.log(value)
//  console.log((value.target.attributes['ng-reflect-ng-class'].value))
//  const index = i.findIndex((item:any) => item._id === ii._id);
// const parent = document.getElementsByClassName('table').item(index)?.ELEMENT_NODE;
//  const content=document.getElementsByClassName(value.target.attributes['ng-reflect-ng-class'].value);
//  const child = document.createElement('input');
//  console.log()



  }

  makeTableClassID(id:any,i:any,ii:any){
    const index = i.findIndex((item:any) => item._id === ii._id);
    return id +index.toString()
  }



}
