/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from '../../../../../ref-front/src/lib/api.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { ServiceApi } from '../../shared/service/service-api';
import { catchError } from 'rxjs';
import { getLocalePluralCase } from '@angular/common';

@Component({
  selector: 'ssms-create-crime',
  templateUrl: './create-crime.component.html',
  styleUrls: ['./create-crime.component.css'],
})
export class CreateCrimeComponent implements OnInit {
  step = 'primaryInfo';
  steps = ['primaryInfo', 'caseSuspect', 'victims', 'evidence'];
  showMore = false;
  evidencetype = false;
  showWeaponDetails = false;
  fileData = new FormData();
  fileSelected!: any[];

  searchSuspect = new FormControl();
  suspects: any[] = [];
  isOpenSuspect = false;
  selectedSuspectId = '';
  isOpenNotFoundSuspect = false;
  crimetype = [] as any[];
  searchVictim = new FormControl();
  victims: any[] = [];
  isOpenVictim = false;
  selectedVictimId = '';
  personnelData = [] as any[];
  isOpenNotFoundVictim = false;
  cri = [] as any;
  showVehicleDetails = false;
  showFileInput = false;
  evidences: any[] = [];
  fileName!: string;
  evidenceTypes = [
    {
      _id: '1',
      name: 'Vehicle',
    },
    {
      _id: '2',
      name: 'Weapon',
    },
    {
      _id: '3',
      name: 'Media upload',
    },
  ];
  crimeId = Math.floor(Math.random() * 9000000000) + 1000000000;

  crimeForm = new FormGroup({
    crimeId: new FormControl(this.crimeId),
    crimeDate: new FormControl('', [Validators.required]),
    crimeTime: new FormControl('', [Validators.required]),
    crimeType: new FormControl('', [Validators.required]),
    statementOfOffense: new FormControl('', [Validators.required]),
    criminalId: new FormArray<any>([]),
    victimId: new FormArray<any>([]),
    media: new FormArray<any>([]),
    subscriberId: new FormControl(),
      personnelId: new FormControl(),
    evidence: new FormGroup<any>({
      type: new FormControl(''),

      vehicleId: new FormControl(''),
      brand: new FormControl(''),
      weaponName: new FormControl(''),
      weaponType: new FormControl(''),
      license: new FormControl(''),
      weaponlicense: new FormControl(''),
      modelNo: new FormControl(''),
      file: new FormControl(''),
    }),
    status: new FormControl('ACTIVE'),
  });

  caseSuspects = [
    {
      _id: '1',
      fullName: 'Julius Oko',
    },
    {
      _id: '2',
      fullName: 'Akpeki Kariebi',
    },
    {
      _id: '3',
      fullName: 'Ndubuisi Daniel',
    },
  ];

  victimsData = [
    {
      _id: '1',
      fullName: 'Emmanuel Samuel',
    },
    {
      _id: '2',
      fullName: 'Somina Davies',
    },
    {
      _id: '3',
      fullName: 'John Daniel',
    },
  ];

  constructor(
    private apiService: ServiceApi,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.find('crime-type').subscribe((e) => {
      this.crimetype = e.filter((id: any) => {
        return id.subscriberId === this.personnelData[0].organizationId;
      });
      console.log(
        'first',

        this.personnelData
      );
    });

    const foundCrimeForm =
      JSON.parse(localStorage.getItem('crimeForm') as string) || null;
    const foundSuspects =
      JSON.parse(localStorage.getItem('suspects') as string) || null;
    const foundVictims =
      JSON.parse(localStorage.getItem('victims') as string) || null;
    if (foundCrimeForm) {
      this.step = localStorage.getItem('step') as string;
      this.crimeForm.patchValue(foundCrimeForm);
      if (foundSuspects?.length) {
        this.suspects = foundSuspects;
      }

      if (foundVictims?.length) {
        this.victims = foundVictims;
      }
    }
  }

  onNext(step: string) {
    this.step = step;
  }

  async onAdddEvidence() {
    const evidence = this.crimeForm.get('evidence')?.value;

    if (evidence?.['type'] == '1') {
      evidence['name'] = 'Vehicle';
      this.evidences.push(evidence);
      // console.log("evidence",evidence)
      this.crimeForm.get('evidence')?.reset();
    }

    if (evidence?.['type'] == '2') {
      evidence['name'] = 'Weapon';

      this.evidences.push(evidence);
      // console.log("evidence",evidence)
      this.crimeForm.get('evidence')?.reset();
    }
    if (evidence?.['type'] == '3') {
      evidence['name'] = 'Media File';
      for (let i = 0; i < this.fileSelected.length; i++) {
        this.fileName = this.fileSelected[i].name;
        const reader = new FileReader();
        reader.onload = () => {
          evidence['file'] = reader.result;
          evidence['files'] = this.fileData;
          this.evidences.push(evidence);
        };
        reader.readAsDataURL(this.fileSelected[i]);
      }
      console.log('evidence', evidence);
    }
  }

  OpenSuspect(id: string) {
    this.selectedSuspectId = id;
    this.isOpenSuspect = !this.isOpenSuspect;
  }

  onDeleteSuspect(id: string) {
    this.suspects = this.suspects.filter((suspect) => suspect._id !== id);
    this.isOpenSuspect = false;
    this.selectedSuspectId = '';
  }

  OpenVictim(id: string) {
    this.selectedVictimId = id;
    this.isOpenVictim = !this.isOpenVictim;
  }

  onDeleteVictim(id: string) {
    this.victims = this.victims.filter((victim) => victim._id !== id);
    this.isOpenVictim = false;
    this.selectedVictimId = '';
  }

  get criminalFormArray() {
    return this.crimeForm.get('criminalId') as FormArray;
  }

  onAddSuspect() {
    this.apiService
      .findAny('criminal-info', 'nin', this.searchSuspect.value)
      .subscribe((a) => {
        if (a.length === 0) {
          this.apiService
            .users(this.searchSuspect.value)
            .pipe(
              catchError((e) => {
                this.isOpenNotFoundSuspect = true;
                return '';
              })
            )
            .subscribe((e) => {
              setTimeout(() => {
                this.apiService
                  .create('criminal-info', {
                    dateOfBirth: e.birthDate,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    middleName: e.middleName,
                    nin: e.id,
                    gender: e.gender,
                    email: e.email,
                    phone: e.phone,
                    image: e.image,
                    height: e.height,
                    weight: e.weight,
                    eyeColor: e.eyeColor,
                    address: e.address.address,
                    state: e.state,

                    alias: e.username,
                  })
                  .subscribe((ae) => {
                    console.log('suspectsmmm', ae);

                    e._id = ae._id;
                  });
              }, 1000);

              const existSuspect = this.suspects.find(
                (suspect) => suspect._id === e.id
              );

              if (existSuspect) {
                this.searchSuspect.reset();
                this.toast.warning('Suspect exist already!', {
                  duration: 5000,
                  position: 'top-center',
                  style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                    fontSize: '18px',
                  },
                });
                return;
              }
              this.suspects.push(e);
              console.log('suspects', e);
              console.log('suspectsmmm', this.suspects);
              // localStorage.clear()
              this.searchSuspect.reset();
            });
        } else {
          const existSuspect = this.suspects.find(
            (suspect) => suspect._id === a[0]._id
          );

          if (existSuspect) {
            this.searchSuspect.reset();
            this.toast.warning('Suspect exist already!', {
              duration: 5000,
              position: 'top-center',
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
                fontSize: '18px',
              },
            });
            return;
          }
          this.suspects.push(a[0]);
          console.log('suspects', a[0]);
          console.log('suspectsmmm', this.suspects);
          // localStorage.clear()
          this.searchSuspect.reset();
        }
      });
  }

  openSuspect(suspect: any) {
    console.log(suspect);
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
    this.apiService
      .findAny('criminal-info', 'nin', this.searchVictim.value)
      .subscribe((a) => {
        if (a.length === 0) {
          this.apiService
            .users(this.searchVictim.value)
            .pipe(
              catchError((e) => {
                this.isOpenNotFoundSuspect = true;
                return '';
              })
            )
            .subscribe((e) => {
              setTimeout(() => {

                this.apiService
                  .create('criminal-info', {
                    dateOfBirth: e.birthDate,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    middleName: e.middleName,
                    nin: e.id,
                    gender: e.gender,
                    email: e.email,
                    phone: e.phone,
                    image: e.image,
                    height: e.height,
                    weight: e.weight,
                    eyeColor: e.eyeColor,
                    address: e.address.address,
                    state: e.state,

                    alias: e.username,
                  })
                  .subscribe((ae) => {
                    console.log('suspectsmmm', ae);

                    e._id = ae._id;
                  });
              }, 1000);
              const existVictim = this.suspects.find(
                (victim) => victim._id === e.id
              );

              if (existVictim) {
                this.searchVictim.reset();
                this.toast.warning('Suspect exist already!', {
                  duration: 5000,
                  position: 'top-center',
                  style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                    fontSize: '18px',
                  },
                });
                return;
              }
              this.victims.push(e);

              // localStorage.clear()
              this.searchVictim.reset();
            });
        } else {
          const existVictim = this.victims.find(
            (victim) => victim._id === a[0]._id
          );

          if (existVictim) {
            this.searchVictim.reset();
            this.toast.warning('Suspect exist already!', {
              duration: 5000,
              position: 'top-center',
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
                fontSize: '18px',
              },
            });
            return;
          }
          this.victims.push(a[0]);
          console.log('suspects', a[0]);
          console.log('suspectsmmm', this.victims);
          // localStorage.clear()
          this.searchVictim.reset();
        }
      });
  }

  closeNotFoundVictim() {
    this.isOpenNotFoundVictim = false;
  }

  onSelectEvidenceType(event: any) {
    if (event.value == '1') {
      this.showVehicleDetails = true;
      this.showFileInput = false;
      this.showWeaponDetails = false;
    } else if (event.value == '2') {
      this.showFileInput = false;
      this.showVehicleDetails = false;
      this.showWeaponDetails = true;
    } else if (event.value == '3') {
      this.showFileInput = true;
      this.showVehicleDetails = false;
      this.showWeaponDetails = false;
    } else if (
      event.value == null ||
      event.value == '' ||
      event.value == undefined
    ) {
      this.showFileInput = false;
      this.showVehicleDetails = false;
      this.showWeaponDetails = false;
    }
  }

  onDeleteEvidence(id: any) {
    this.evidences.splice(id, 1);
    console.log(this.evidences);
    // this.evidences = this.evidences.filter(evidence => evidence._id !== id);
  }

  upload(event: any) {
    this.fileSelected = event.target.files;
    const reader = new FileReader();
    console.log(this.fileSelected[0]);
    for (let i = 0; i < this.fileSelected.length; i++) {
      console.log(this.fileSelected);
      this.fileData.append(
        'file',
        this.fileSelected[i],
        this.fileSelected[i].name
      );
    }
    // event.target.files.forEach((file:File) => {
    //

    //
    // });
  }

  onSubmit() {
    const files = [] as any[];
    const crimeForm = this.crimeForm.value;
    const criminalIds = this.suspects.map((suspect) => suspect._id);
    const victimIds = this.victims.map((victim) => victim._id);
    crimeForm['criminalId'] = criminalIds;
    crimeForm['victimId'] = victimIds;
    crimeForm['evidence'] = this.evidences.filter((s: any) => {
      return s.type !== '3';
    });
    crimeForm['media'] = files;

    this.evidences.forEach((evidence: any) => {
      if (evidence.type === '3') {
        this.apiService.upload('document', evidence.files).subscribe((e) => {
          files.push(e[0]);
        });
      }
    });
    crimeForm['media'] = files;
    crimeForm['personnelId']=this.personnelData[0]._id
    crimeForm['subscriberId']=this.personnelData[0].organizationId


    setTimeout(() => {
      console.log('crimeForm', crimeForm.media.length);

      this.apiService
        .create('crime-info', crimeForm)
        .pipe(
          this.toast.observe({
            loading: 'Creating crime information...',
            success: 'Successfully created crime information',
            error: 'Could not create crime information.',
          })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        )
        .subscribe((data) => {
          console.log('data', data);
          const id = data._id;

          for (let i = 0; i < data.criminalId.length; i++) {
            console.log('it works', id);
            this.apiService
              .update('criminal-info', data.criminalId[i], {
                $push: { caseId: id },
              })
              .subscribe((a) => {
                console.log('it works', a);
              });
          }

          for (let i = 0; i < data.victimId.length; i++) {
            this.apiService
              .update('criminal-info', data.victimId[i], {
                $push: { victimId: id },
              })
              .subscribe((a) => {
                console.log('it works', a);
              });
          }
          localStorage.removeItem('crimeForm');
          localStorage.removeItem('suspects');
          localStorage.removeItem('victims');
          localStorage.removeItem('step');
          this.router.navigate(['../crime']);
        });
    }, 1000);
  }
}
