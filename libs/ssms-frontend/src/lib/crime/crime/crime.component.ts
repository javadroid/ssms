/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { ServiceApi } from '../../shared/service/service-api';
import { environment } from '@env-api/environment';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
@Component({
  selector: 'ssms-crime',
  templateUrl: './crime.component.html',
  styleUrls: ['./crime.component.css'],
})
export class CrimeComponent implements OnInit {
  constructor(
    private apiService: ServiceApi,
    private toast: HotToastService,
    private router: Router
  ) {}
  isStatementUpdate = false;
  isOpenNotFoundSuspect = false;
  isOpenNotFoundVictim = false;
  PersonnelDetail = [] as any;
  isSuspect = false;
  evidencetype = false;
  isVictim = false;
  isEvidence = false;
  isTransferCase = false;
  showFileInput = false;
  statement_modal=false
  showWeaponDetails = false;
  showVehicleDetails = false;
  statement = new FormControl();
  searchSuspect = new FormControl();
  searchVictim = new FormControl();
  // brand= new FormControl();
  // license= new FormControl();
  // modelNo= new FormControl();
  // type= new FormControl();
  suspects = [] as any;
  victims = [] as any;
  fileName!: string;
  evidences: any[] = [];
  rEvidences: any[] = [];
  fileSelected!: any[];
  isOpenVictim = false;
  selectedVictimId = '';
  isOpenSuspect = false;
  selectedSuspectId = '';
  fileData = new FormData();
  //  personnelId= as any
  crime = [] as any[0];
  criminal = [] as any;
  weapon = [] as any;
  vehicle = [] as any;
  media = [] as any;
  mediaName = [] as any[];
  victim = [] as any;
  crimeSearch = false;
  crimeDetail = [] as any;
  crimefullDetail = [] as any;
  selectindex: any;
  showfiltercriteria = false;
  organizationData = [] as any;
  personnelData = [] as any;
  persenelid = new FormControl('');
  OLdPersonnelData = [] as any;
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

  type = new FormControl();

  vehicleId = new FormControl('');
  brand = new FormControl('');
  weaponName = new FormControl('');
  weaponType = new FormControl('');
  license = new FormControl('');
  weaponlicense = new FormControl('');
  modelNo = new FormControl('');
  file = new FormControl('');
  isp: string | undefined | null = null;

  ngOnInit(): void {
    const p = localStorage.getItem('@personnel');
    const o = localStorage.getItem('@organization');
    const isp = localStorage.getItem('@isPersonnel');
    if (p && o)
      if (
        this.personnelData.length === 0 &&
        this.organizationData.length === 0
      ) {
        this.personnelData = [JSON.parse(p)];
        this.organizationData = [JSON.parse(o)];
      }
    // console.log("personnelData" ,this.personnelData,this.organizationData)

    if (isp && isp === 'true') {
      if (this.organizationData[0]?._id) {
        this.isp = isp;
        this.apiService.find('crime-info').subscribe((data: any[]) => {
          this.crimeDetail = data.filter(
            (item: any) =>
              item.subscriberId === this.organizationData[0]?._id &&
              item.personnelId == this.personnelData[0]._id
          );
          console.log('this.crimeDetail', this.crimeDetail);
          // for (let i = 0; i < data.length; i++) {
          //   const element = data[i].personnelId;
          //   console.log("data",data)
          // }
        });
      }
    } else {
      if (this.organizationData[0]?._id) {
        this.apiService.find('crime-info').subscribe((data: any) => {
          this.crimeDetail = data.filter(
            (item: any) => item.subscriberId === this.organizationData[0]?._id
          );

          console.log('this.', this.crimeDetail);
          // for (let i = 0; i < data.length; i++) {
          //   const element = data[i].personnelId;

            // if (element)
            //   this.apiService.findOne('personnel', element).subscribe((s) => {
            //     this.crimeDetail[i]['personnel'] = s;
            //     console.log('data', this.crimeDetail);
            //   });
          // }
        });
      }
    }
  }

  showmenu(index: any, data: any) {
    this.crime = data;

    if (this.isp === null) {
      this.apiService.find('personnel').subscribe((m) => {
        this.PersonnelDetail = m.filter(
          (n: { organizationId: string }) =>
            n.organizationId === this.organizationData[0]?._id
        );
        this.isTransferCase = true;
      });
    }
  }

  onSearch(id: string) {
    this.apiService.findOne('crime-info', id).subscribe((e) => {
      this.rEvidences = e.evidence;

      this.apiService.findOne('personnel', e.personnelId).subscribe((s) => {
        this.personnelData = [s];
      });
    });

    this.apiService.findOne('crime-info', id).subscribe((e) => {
      this.crimeSearch = true;
      this.crime = e;

      this.vehicle = e.evidence.filter((name: any) => {
        return name.name === 'Vehicle';
      });
      this.weapon = e.evidence.filter((name: any) => {
        return name.name === 'Weapon';
      });

      this.evidences = e.evidence;

      console.log(this.crime);
      let s = [] as any;
      const crime = [] as any;
      const victim = [] as any;
      for (let i = 0; i < e.media.length; i++) {
        s = {
          image: e.media[i],
          name: e.media[i].split(`${environment.apiLink}/document/`)[1],
        };
        this.media.push(s);
      }

      for (let i = 0; i < e.criminalId.length; i++) {
        this.apiService
          .findOne('criminal-info', e.criminalId[i])
          .subscribe((a) => {
            crime.push(a);
          });
        this.criminal = crime;
        this.suspects = crime;
      }

      for (let i = 0; i < e.victimId.length; i++) {
        this.apiService
          .findOne('criminal-info', e.victimId[i])
          .subscribe((a) => {
            victim.push(a);
          });
        this.victim = victim;
        this.victims = victim;
      }

      // this.apiService.findOne('personnel',e.personnelId).subscribe(a=> {
      //   this.personnelId=a
      // })
    });
  }



  OpenSuspect(id: string) {
    this.selectedSuspectId = id;
    this.isOpenSuspect = !this.isOpenSuspect;
  }

  onDeleteSuspect(id: string) {
    this.suspects = this.suspects.filter(
      (suspect: { _id: string }) => suspect._id !== id
    );
    this.isOpenSuspect = false;
    this.selectedSuspectId = '';
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
                (suspect: { _id: any }) => suspect._id === e.id
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
            (suspect: { _id: any }) => suspect._id === a[0]._id
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
  statementUpdate() {
    const time = new Date();
    const s =
      this.crime.statementOfOffense +
      `<div>
      <h3>**********************************************************************************************</h3>
          <h3><strong>Statement Updated</strong><h4>Time ${ time.toLocaleTimeString()} Date: ${time.toDateString()} </h4> </h3>
          <h4>Officer: ${this.personnelData[0].lastname +' ' +this.personnelData[0].firstname} </h4>
          <h5>${'&emsp; '+this.statement.value}<h5>
          `
    this.apiService
      .update('crime-info', this.crime._id, { statementOfOffense: s })
      .subscribe((e) => {
        Swal.fire('Statement Updated ', '', 'success');
        this.ngOnInit();
        this.isStatementUpdate = false;
        this.statement.reset();
        this.onSearch(this.crime._id);
      });
  }
  updateSuspect() {
    const suspectsName = [];
    const criminalName = [];
    const time = new Date();
    for (let i = 0; i < this.suspects.length; i++) {
      suspectsName.push(
        '\n ',
        this.suspects[i].lastName +
          ' ' +
          this.suspects[i].firstName +
          ' (' +
          this.suspects[i].nin +
          ') '
      );
    }
    for (let i = 0; i < this.criminal.length; i++) {
      criminalName.push(
        '\n ',
        this.criminal[i].lastName +
          ' ' +
          this.criminal[i].firstName +
          ' (' +
          this.criminal[i].nin +
          ') '
      );
    }
    const criminalIds = this.suspects.map(
      (suspect: { _id: any }) => suspect._id
    );

    const removedcriminalIds = this.criminal.map(
      (suspect: { _id: any }) => suspect._id
    );

    const s =
      this.crime.statementOfOffense +
      `<div>
      <h3>**********************************************************************************************</h3>
          <h3><strong>Suspect Changed</strong><h4>Time ${ time.toLocaleTimeString()} Date: ${time.toDateString()} </h4> </h3>
          <h4>Officer: ${this.personnelData[0].lastname +' ' +this.personnelData[0].firstname} </h4>
          <h5>${'&emsp; Suspect Changed to : '+suspectsName}<h5>
          `
      this.apiService
      .update('crime-info', this.crime._id, {
        statementOfOffense: s,
        criminalId: criminalIds,
      })
      .subscribe((e) => {
        Swal.fire('Suspect Updated ', '', 'success');
        this.isSuspect = false;

        const id = e._id;

        for (let i = 0; i < removedcriminalIds.length; i++) {
          console.log('it works', id);
          this.apiService
            .update('criminal-info', removedcriminalIds[i], {
              $pull: { caseId: id },
            })
            .subscribe((a) => {
              console.log('it works', a);
            });
        }
        if (this.suspects.length === 0 || this.criminal.length === 0) {
          this.criminal = [];
          this.suspects = [];
          console.log(',dsvazdfgaser', this.criminal);
        }
        for (let i = 0; i < criminalIds.length; i++) {
          console.log('it works', id);
          this.apiService
            .update('criminal-info', criminalIds[i], {
              $push: { caseId: id },
            })
            .subscribe((a) => {
              console.log('it works', a);
            });

          this.onSearch(this.crime._id);
        }
        setTimeout(() => {
          this.onSearch(this.crime._id);
        }, 2000);
      });
  }

  OpenVictim(id: string) {
    this.selectedVictimId = id;
    this.isOpenVictim = !this.isOpenVictim;
  }

  onDeleteVictim(id: string) {
    this.victims = this.victims.filter(
      (victim: { _id: string }) => victim._id !== id
    );
    this.isOpenVictim = false;
    this.selectedVictimId = '';
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
              const existVictim = this.victims.find(
                (victim: { _id: any }) => victim._id === e.id
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
            (victim: { _id: any }) => victim._id === a[0]._id
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

  updateVictim() {
    const victimsName = [];
    const time = new Date();
    for (let i = 0; i < this.victims.length; i++) {
      victimsName.push(
        `<h5>${'&emsp;&emsp;'+ this.victims[i].lastName +' '+this.victims[i].firstName +' '+this.victims[i].nin}
          </h5>`
      );
    }

    const criminalIds = this.victims.map(
      (suspect: { _id: any }) => suspect._id
    );

    const removedcriminalIds = this.victim.map(
      (suspect: { _id: any }) => suspect._id
    );

    const s =
      this.crime.statementOfOffense +
      `<div>
      <h3>**********************************************************************************************</h3>
          <h3><strong>Suspect Changed</strong><h4>Time ${ time.toLocaleTimeString()} Date: ${time.toDateString()} </h4> </h3>
          <h4>Officer: ${this.personnelData[0].lastname +' ' +this.personnelData[0].firstname} </h4>
          <h5>${'&emsp; Suspect Changed to : '+victimsName}<h5>
          `
    this.apiService
      .update('crime-info', this.crime._id, {
        statementOfOffense: s,
        victimId: criminalIds,
      })
      .subscribe((e) => {
        Swal.fire('Suspect Updated ', '', 'success');
        this.isVictim = false;

        const id = e._id;

        for (let i = 0; i < removedcriminalIds.length; i++) {
          console.log('it works', id);
          this.apiService
            .update('criminal-info', removedcriminalIds[i], {
              $pull: { caseId: id },
            })
            .subscribe((a) => {
              console.log('it works', a);
            });
        }
        if (this.victims.length === 0) {
          this.victims = [];
          this.victim = [];
        }

        for (let i = 0; i < criminalIds.length; i++) {
          console.log('it works', id);
          this.apiService
            .update('criminal-info', criminalIds[i], {
              $push: { caseId: id },
            })
            .subscribe((a) => {
              console.log('it works', a);
            });
        }

        this.onSearch(this.crime._id);

        console.log(criminalIds, removedcriminalIds);
      });

    setTimeout(() => {
      this.onSearch(this.crime._id);
    }, 2000);
  }

  onProceedToAdd() {
    console.log('on proceed to add suspect ');

    this.router.navigateByUrl('/criminal');
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

  async onAdddEvidence() {
    const evidence = {
      type: this.type.value,
      brand: this.brand.value,
      license: this.license.value,
      modelNo: this.modelNo.value,
      file: this.file.value,
    };
    console.log('evidence', evidence);

    if (evidence?.['type'] == '1') {
      //@ts-ignore
      evidence['name'] = 'Vehicle';
      this.evidences.push(evidence);
      console.log('evidence', evidence);
      this.brand.reset();
      this.license.reset();
      this.modelNo.reset();
    }

    if (evidence?.['type'] == '2') {
      //@ts-ignore
      evidence['name'] = 'Weapon';

      this.evidences.push(evidence);
      this.brand.reset();
      this.license.reset();
      this.modelNo.reset();
    }

    if (evidence?.['type'] == '3') {
      //@ts-ignore
      evidence['name'] = 'Media File';
      for (let i = 0; i < this.fileSelected.length; i++) {
        this.fileName = this.fileSelected[i].name;
        const reader = new FileReader();
        reader.onload = () => {
          //@ts-ignore
          evidence['file'] = reader.result;
          //@ts-ignore
          evidence['files'] = this.fileData;
          this.evidences.push(evidence);
        };
        reader.readAsDataURL(this.fileSelected[i]);
      }
      console.log('evidence', evidence);
    }
  }

  onDeleteEvidence(id: any) {
    this.evidences.splice(id, 1);
    console.log(this.evidences);
    // this.evidences = this.evidences.filter(evidence => evidence._id !== id);
  }

  updateEvidence() {
    const evidencesName = [];
    const rEvidenceName = [];

    const time = new Date();
    for (let i = 0; i < this.evidences.length; i++) {
      if (this.evidences[i].name === 'Media File') {
        // console.log(files)
        // this.evidencesName.push('\n',this.evidences[i].name+' (link to midia '+this.m+') ');
      } else {
        evidencesName.push(
          `<h5> &emsp;&emsp;
          ${this.evidences[i].name +' ' +this.evidences[i].brand + ' '+this.evidences[i].modelNo +' ' +this.evidences[i].license} </h5>`
        );
      }
    }

    for (let i = 0; i < this.rEvidences.length; i++) {
      if (this.rEvidences[i].name === 'Media File') {
        // console.log(files)
        // this.evidencesName.push('\n',this.evidences[i].name+' (link to midia '+this.m+') ');
      } else {
        rEvidenceName.push(
          `<h5> &emsp;&emsp;
         ${ this.rEvidences[i].name +
            ' ' +
            this.rEvidences[i].brand +' '+
            this.rEvidences[i].modelNo +
            ' ' +
            this.rEvidences[i].license}
            </h5>`
        );
      }
    }

    const s =
      this.crime.statementOfOffense +
      `<div>
      <h3>**********************************************************************************************</h3>
          <h3><strong>Evidence Changed </strong><h4>Time ${ time.toLocaleTimeString()} Date: ${time.toDateString()} </h4> </h3>
          <h4>Officer: ${this.personnelData[0].lastname +' ' +this.personnelData[0].firstname} </h4>
          <h5>${'&emsp; Evidence Changed from : '+rEvidenceName}<h5>
          <h5>${'&emsp; Evidence Changed to : '+evidencesName}<h5>
          `
    console.log(
      'rEvidenceName',
      this.evidences,
      'evidencesName',
      this.rEvidences
    );
    this.apiService
      .update('crime-info', this.crime._id, {
        statementOfOffense: s,
        evidence: this.evidences,
      })
      .subscribe((e) => {
        Swal.fire('Evidence Updated ', '', 'success');
        this.isEvidence = false;
        this.onSearch(this.crime._id);
      });
    setTimeout(() => {
      this.onSearch(this.crime._id);
    }, 2000);
  }

  closeCase() {
    const time = new Date();
    console.log("first")
    const s =
      this.crime.statementOfOffense +
      `<div>
      <h3>**********************************************************************************************</h3>
          <h3><strong>CASE CLOSED</strong><h4>Time: ${ time.toLocaleTimeString()} Date: ${time.toDateString()} </h4> </h3>
          <h4>Officer: ${this.personnelData[0].lastname +' ' +this.personnelData[0].firstname} </h4>
          `
    this.apiService
      .update('crime-info', this.crime._id, {
        statementOfOffense: s,
        status: 'CLOSED',
      })
      .subscribe(() => {
        Swal.fire('Case closed', '', 'success');
        this.onSearch(this.crime._id)
      });
  }

  openCase() {
    const time = new Date();


    const s =
      this.crime.statementOfOffense +
      `<div>
      <h3>**********************************************************************************************</h3>
          <h3><strong>CASE REOPEN</strong><h4>Time ${ time.toLocaleTimeString()} Date: ${time.toDateString()} </h4> </h3>
          <h4>Officer: ${this.personnelData[0].lastname +' ' +this.personnelData[0].firstname} </h4>
          `
    this.apiService
      .update('crime-info', this.crime._id, {
        statementOfOffense: s,
        status: 'ACTIVE',
      })
      .subscribe(() => {
        Swal.fire('Case open', '', 'success');
        this.onSearch(this.crime._id)
      });
  }

  transferCase() {
    const time = new Date();
if(this.persenelid.value)
    this.apiService.findOne('personnel', this.persenelid.value).subscribe(a=>{
    this.apiService
      .findOne('personnel', this.crime.personnelId)
      .subscribe((e: any) => {
        const s =
          this.crime.statementOfOffense +
          `<div>
          <h3>**********************************************************************************************</h3>
              <h3><strong>CASE TRANSFERED</strong><h4>Time ${ time.toLocaleTimeString()} Date: ${time.toDateString()} </h4> </h3>

              <h5>${'&emsp; Case Transfered to : '+a.lastname+' '+a.firstname+' with ID: '+ this.persenelid.value }<h5>
              `
        this.apiService
          .update('crime-info', this.crime._id, {
            personnelId: this.persenelid.value,
            statementOfOffense: s,
          })
          .subscribe((e) => {
            this.isTransferCase = false;
Swal.fire('Case transfered', '', 'success');

          });
      });

    })
  }


  viewStatement(){

    this.statement_modal = true;


  }
  closeStatement(){

    this.statement_modal = false;

  }
}
