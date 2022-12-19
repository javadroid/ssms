
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Observable } from 'rxjs';
import { ApiService } from './../../../../../ref-front/src/lib/api.service';
import { CrimeInfoDTO } from './../../../../../api-models/src/dto/crimeInfo.dto';
import { Component } from '@angular/core';

@Component({
  selector: 'ssms-crime',
  templateUrl: './crime.component.html',
  styleUrls: ['./crime.component.css'],
})
export class CrimeComponent {

  crime$!: Observable<CrimeInfoDTO>;
  constructor(private apiService: ApiService) {}



  onSearch(value: string) {
    this.crime$ = this.apiService.search('crime-info', value);

  }
}
