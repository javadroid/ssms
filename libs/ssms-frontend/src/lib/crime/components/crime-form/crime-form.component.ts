import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ssms-crime-form',
  templateUrl: './crime-form.component.html',
  styleUrls: ['./crime-form.component.css'],
})
export class CrimeFormComponent implements OnInit {
  crimeForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  createForm() {
    this.crimeForm = this.fb.group({
      officerId: ['', Validators.required],
      weaponId: [''],
      crimeCategory: ['', Validators.required],
      createdDate: [new Date(), Validators.required],
      crimeTime: [new Date().getTime(), Validators.required],
      statementOfOffence: ['', Validators.required],
      incidentId: ['', Validators.required],
      polycyId: ['', Validators.required],
      progressStatus: ['pending', Validators.required],
      criminalId: ['', Validators.required],
      motive: ['', Validators.required],
      vehicleId: [''],
      reportId: [''],
      locationId: ['', Validators.required],
    });
  }
}
