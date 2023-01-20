import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApi } from '../shared/service/service-api';
import Swal from 'sweetalert2';

@Component({
  selector: 'ssms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  subcriber = localStorage.getItem('id');
  newOrg = false;
  organizationData=[]as any[]
  constructor(private http: ServiceApi, private route: Router) {}
  show='MAIN'
  active:string | undefined



  ngOnInit(): void {
    // console.log(e);

        console.log(this.subcriber);
    if (this.subcriber) {
      this.http.findOne('organization', this.subcriber).subscribe((e) => {
        console.log(e);
        if(e.status=="DISABLE"){
          localStorage.clear()
          Swal.fire(
            'Account Disable ',
            'Contact your administrator'
            ,
            'success'
          );
          this.route.navigate(['/login'])
          return
        }
        this.organizationData=[e]
        console.log(this.subcriber);

        if (e.profile === 'NOTCOMPLETEDPROFILE') {
          this.newOrg = true;
        }
      });
    }
  }


  onClose(event:any){
    this.newOrg=event
  }

  onAdd() {
    console.log('yes');
    this.route.navigate(['/new-report']);
  }

  onOutletLoaded(component:any) {
    component.organizationData=this.organizationData
}

logout(){
  localStorage.clear()
  this.route.navigate(['/login'])
}
}
