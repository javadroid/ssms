/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Observable } from 'rxjs';
import { ApiService } from './../../../../../ref-front/src/lib/api.service';
import { Component } from '@angular/core';
import { ServiceApi } from '../../shared/service/service-api';

@Component({
  selector: 'ssms-crime',
  templateUrl: './crime.component.html',
  styleUrls: ['./crime.component.css'],
})
export class CrimeComponent {
  constructor(private apiService: ServiceApi) {}

  crime = [] as any[0];
  criminal = [] as any;
  weapon = [] as any;
  vehicle = [] as any;
  media = [] as any;
  mediaName = [] as any[];
  victim = [] as any;
  crimeSearch=false
  onSearch(id: string) {

    this.apiService.findOne('crime-info', id).subscribe((e) => {


      this.crimeSearch=true
      this.crime = e;

      this.vehicle = e.evidence.filter((name: any) => {
        return name.name === 'Vehicle';
      });
      this.weapon = e.evidence.filter((name: any) => {
        return name.name === 'Weapon';
      });
      console.log(this.crime);
      let s = [] as any;
      for (let i = 0; i < e.media.length; i++) {
        s = {
          image: e.media[i],
          name: e.media[i].split('http://localhost:3333/api/document/')[1],
        };
        this.media.push(s);

      }

      for (let i = 0; i < e.criminalId.length; i++) {
        this.apiService
          .findAny('criminal-info','nin', e.criminalId[i])
          .subscribe((a) => {
            this.criminal = a;
            console.log( this.criminal)
          });
      }

      for (let i = 0; i < e.victimId.length; i++) {
        this.apiService
          .findAny('criminal-info','nin', e.victimId[i])
          .subscribe((a) => {
            this.victim = a;
          });
      }
    });
  }
}
