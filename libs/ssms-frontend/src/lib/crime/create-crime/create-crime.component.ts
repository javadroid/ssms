/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from '../../../../../ref-front/src/lib/api.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'ssms-create-crime',
  templateUrl: './create-crime.component.html',
  styleUrls: ['./create-crime.component.css'],
})
export class CreateCrimeComponent implements OnInit {

  step = 'primaryInfo';
  steps = ['primaryInfo', 'caseSuspect', 'victims', 'evidence'];
  showMore = false;

  searchSuspect = new FormControl();
  suspects: any[] = [];
  isOpenSuspect = false;
  selectedSuspectId = '';
  isOpenNotFoundSuspect = false;

  searchVictim = new FormControl();
  victims: any[] = [];
  isOpenVictim = false;
  selectedVictimId = '';
  isOpenNotFoundVictim = false;

  showVehicleDetails = false;
  showFileInput = false;
  evidences: any[] = [];

  evidenceTypes = [
    {
      _id: '1',
      name: 'Vehicle'
    },
    {
      _id: '2',
      name: 'Weapon'
    }
  ]
  crimeId = Math.floor(Math.random() * 9000000000) + 1000000000;

  crimeForm = new FormGroup({
    crimeId: new FormControl(this.crimeId),
    crimeDate:new FormControl('', [Validators.required]),
    crimeTime:new FormControl('', [Validators.required]),
    crimeType:new FormControl('', [Validators.required]),
    statementOfOffense:new FormControl('', [Validators.required]),
    criminalId: new FormArray<any>([]),
    victimId: new FormArray<any>([]),
    evidence: new FormGroup<any>({
      type: new FormControl(''),
      vehicleId: new FormControl(''),
      brand: new FormControl(''),
      license: new FormControl(''),
      modelNo: new FormControl(''),
      file: new FormControl(''),
  }),
    status: new FormControl('ACTIVE')
  });

  caseSuspects = [
    {
      _id: '1',
      fullName: 'Julius Oko'
    },
    {
      _id: '2',
      fullName: 'Akpeki Kariebi'
    },
    {
      _id: '3',
      fullName: 'Ndubuisi Daniel'
    }
  ];

  victimsData = [
    {
      _id: '1',
      fullName: 'Emmanuel Samuel'
    },
    {
      _id: '2',
      fullName: 'Somina Davies'
    },
    {
      _id: '3',
      fullName: 'John Daniel'
    }
  ]

  constructor(
    private apiService: ApiService,
    private toast: HotToastService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    const foundCrimeForm = JSON.parse( localStorage.getItem('crimeForm')  as string) || null;
    const foundSuspects = JSON.parse( localStorage.getItem('suspects')  as string) || null;
    const foundVictims = JSON.parse( localStorage.getItem('victims')  as string) || null;
    if(foundCrimeForm) {
      this.step = localStorage.getItem('step') as string;
      this.crimeForm.patchValue(foundCrimeForm);
      if(foundSuspects?.length) {
        this.suspects = foundSuspects;
      }

      if(foundVictims?.length) {
        this.victims = foundVictims;
      }
    }
  }

  onNext(step: string) {
    this.step = step;
  }

  onAdddEvidence() {
    const evidence = this.crimeForm.get('evidence')?.value;
    this.evidences.push(evidence);
    this.crimeForm.get('evidence')?.reset();
  }

  OpenSuspect(id: string) {
    this.selectedSuspectId = id;
    this.isOpenSuspect = !this.isOpenSuspect;
  }

  onDeleteSuspect(id: string) {
    this.suspects = this.suspects.filter(suspect => suspect._id !== id);
    this.isOpenSuspect = false;
    this.selectedSuspectId = '';
  }

  OpenVictim(id: string) {
    this.selectedVictimId = id;
    this.isOpenVictim = !this.isOpenVictim;
  }

  onDeleteVictim(id: string) {
    this.victims = this.victims.filter(victim => victim._id !== id);
    this.isOpenVictim = false;
    this.selectedVictimId = '';
  }

  get criminalFormArray() {
    return this.crimeForm.get('criminalId') as FormArray;
  }

  onAddSuspect() {

    const foundSuspect = this.caseSuspects.find(suspect => suspect._id === this.searchSuspect.value);

    if(!foundSuspect) {
      this.isOpenNotFoundSuspect = true;
      return
    }
    const existSuspect = this.suspects.find(suspect => suspect._id === foundSuspect._id);
    if(existSuspect) {
      this.searchSuspect.reset();
      this.toast.warning('Suspect exist already!', {
        duration: 5000,
        position: 'top-center',
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
          fontSize: '18px'
        },
      });
      return;
    }
    this.suspects.push(foundSuspect);
    this.searchSuspect.reset();
  }

  closeNotFoundSuspect() {
    this.isOpenNotFoundSuspect = false;
  }


  onProceedToAdd() {
    console.log('on proceed to add suspect ');
    localStorage.setItem('crimeForm', JSON.stringify(this.crimeForm.value));
    localStorage.setItem('suspects', JSON.stringify(this.suspects));
    localStorage.setItem('victims', JSON.stringify(this.victims));
    localStorage.setItem('step', this.step);
    this.router.navigateByUrl('/dashboard');
  }

  onAddVictim() {

    const foundVictim = this.victimsData.find(victim => victim._id === this.searchVictim.value);

    if(!foundVictim) {
      this.isOpenNotFoundVictim = true;
      return
    }
    const existVictim = this.victims.find(victim => victim._id === foundVictim._id);
    if(existVictim) {
      this.searchVictim.reset();
      this.toast.warning('Victim exist already!', {
        duration: 5000,
        position: 'top-center',
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
          fontSize: '18px'
        },
      });
      return;
    }
    this.victims.push(foundVictim);
    this.searchVictim.reset();
  }

  closeNotFoundVictim() {
    this.isOpenNotFoundVictim = false;
  }

  onSelectEvidenceType(event: any) {
    const foundEvidence = this.evidenceTypes.find(evidence => evidence._id === event.value);

    if(foundEvidence?.name?.toLowerCase().includes('vehicle')) {
      this.showVehicleDetails = true;
      this.showFileInput = false;
    }

    if(!foundEvidence?.name?.toLowerCase().includes('vehicle')) {
      this.showFileInput = true;
      this.showVehicleDetails = false;
    }
  }

  onDeleteEvidence(id: string) {
    this.evidences = this.evidences.filter(evidence => evidence._id !== id);
  }


  onSubmit() {
   const crimeForm = this.crimeForm.value;
   const criminalIds = this.suspects.map(suspect => suspect._id);
   const victimIds = this.victims.map(victim => victim._id);
   crimeForm['criminalId'] = criminalIds;
   crimeForm['victimId'] = victimIds;
   crimeForm['evidence'] = this.evidences;

    this.apiService.create('crime-info', crimeForm).pipe(
      this.toast.observe({
        loading: 'Creating crime information...',
        success: 'Successfully created crime information',
        error: 'Could not create crime information.',
      }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ).subscribe(data => {

      localStorage.removeItem('crimeForm');
      localStorage.removeItem('suspects');
      localStorage.removeItem('victims');
      localStorage.removeItem('step');
      this.router.navigateByUrl('/crime');
    })
  }
}
