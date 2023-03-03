import { Component, OnInit } from '@angular/core';
import { ServiceApi } from '../shared/service/service-api';
import Swal from 'sweetalert2';
import { environment } from '@env-api/environment';

@Component({
  selector: 'ssms-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css'],
})
export class ViewReportComponent implements OnInit {

  constructor(private http: ServiceApi) {}
  statement_modal=false
  showList = true;
  showView = false;
  officer=''
  media=[] as any
  weapon=[] as any
  vehicle=[] as any
  victimDatas=[] as any
  criminalDatas=[] as any
  oneCrime=[] as any
  case_modal=false
  caseData=[] as any
  personnelData=[] as any
  organizationData=[] as any
  isRelate=false
  reportType=[] as any
  reports=[] as any
  report=[] as any
  personneldetails=[] as any
   type=localStorage.getItem("@isPersonnel")
     p=localStorage.getItem("@personnel")
     o=localStorage.getItem("@organization")
  ngOnInit(): void {


    if(this.p&&this.o){
    this.personnelData=[JSON.parse(this.p)]
    this.organizationData=[JSON.parse(this.o)]
    }

    if(this.type==="true"){
      this.http.find('report').subscribe((e) => {
        this.reports=e.filter((id:any)=> id.personnel===this.personnelData[0]._id)
      });
    }else{
      this.http.find('report').subscribe((e) => {
        this.reports=e.filter((id:any)=> id.organization===this.organizationData[0]._id)
      });
    }


  }
  viewStatement(){
    this.case_modal = false;
    this.statement_modal = true;


  }
  closeStatement(){
    this.case_modal = true;
    this.statement_modal = false;

  }
  ShowView(item:any){
    this.showList = false;
    this.showView = true;

    this.report=item
    console.log('caseData',this.report)
    if(this.report.caseId.length!==0){
        const crime=[] as any;
    for (let i = 0; i < this.report.caseId.length; i++) {

      this.http.findOne('crime-info',this.report?.caseId[i]).subscribe(a=>{
        crime.push(a);
      })

    }
    this.caseData=crime
    console.log('caseData',this.caseData)
    }

    this.http.findOne("personnel",item.personnel).subscribe(e=>{
      this.personneldetails=e
    })
  }

  viewcaseDetail(item: any) {
    this.case_modal = true;
    console.log(item);
    this.oneCrime=item
    const crime=[] as any;
    const victim=[] as any;
    for (let i = 0; i < item.criminalId.length; i++) {
      this.http.findOne('criminal-info',item.criminalId[i]).subscribe(e=> {
        crime.push(e);
      })
      this.criminalDatas=crime
    }

    this.http.findOne('personnel',item.personnelId).subscribe(e=>{
      this.officer=e.lastname+' ' +e.firstname
      console.log("findpersonnel",e)

    })
    for (let i = 0; i < item.victimId.length; i++) {
      this.http.findOne('criminal-info',item.victimId[i]).subscribe(e=> {
        victim.push(e);
      })
      this.victimDatas=victim
    }


    this.vehicle = item.evidence.filter((name: any) => {
      return name.name === 'Vehicle';
    });
    this.weapon = item.evidence.filter((name: any) => {
      return name.name === 'Weapon';
    });
    // console.log(this.crime);
    let s = [] as any;
    for (let i = 0; i < item.media.length; i++) {
      s = {
        image: item.media[i],
        name: item.media[i].split(`${environment.apiLink}/document/`)[1],
      };
      this.media.push(s);

    }
  }

checkStringContains(substringArray:any[], mainString:string){
    for(let i=0; i<substringArray.length; i++){
        if(mainString.includes(substringArray[i])){
            return true;
        }else  if(mainString.includes(substringArray[i].toUpperCase())){
          return true;
      }
    }
    return false;
}

openlink(url:string){
  window.open(url, "_blank");
}

escalateCase(){
  Swal.fire({
    title: 'Escalate Case ',
    text: "A case file will be open for this case",
    icon: 'warning',
    showCancelButton: true,
    allowEnterKey: true,
    allowOutsideClick:true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Continue",
    denyButtonText: "Cancel",
  }).then((result) => {
    if (result.value) {
      const crime={} as any
      crime['crimeType']=this.report.reportType.toString();
      crime['crimeDate']=this.report.createdAt.split('T')[0]
      crime['statementOfOffense']=`<h4>Report: ${this.report.title}</h4>
      <h5> Crime Type:${this.report.reportType.toString()}</h5>
      <h5> lga:${this.report.lga}</h5>
      <h5> state:${this.report.state}</h5>
      <h5> phone:${this.report.phone}</h5>
      <h5> email:${this.report.email}</h5>
      <h5> Status:${this.report.title}</h5>
      ${this.report.details}`

      crime['reportId']=this.report._id
      crime['crimeTitle']=this.report.title
      crime['status']=this.report.status
      crime['media']=this.report.media
      crime['subscriberId']=this.report.subscriberId
      crime['personnelId']=this.personnelData[0]._id
      crime['subscriberId']=this.personnelData[0].organizationId
      crime['status']='ACTIVE'
      console.log(crime)

      this.http.create('crime-info',crime).subscribe(e=>{
        console.log("e",e)
        this.http.update('report',this.report._id,{status:'ACTIVE', $push: { caseId: e._id }}).subscribe((a) => {
          console.log("report",a)
          Swal.fire(
        'Case File Created',
        '',
        'success'
      )
        });
      })

    }
  })

}
}
