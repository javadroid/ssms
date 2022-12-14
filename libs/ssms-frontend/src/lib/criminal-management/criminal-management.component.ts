import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ssms-criminal-management',
  templateUrl: './criminal-management.component.html',
  styleUrls: ['./criminal-management.component.css'],
})
export class CriminalManagementComponent implements OnInit {
  constructor() {}
  stepper=0
  createModal=false

  ngOnInit(): void {}

  onCreate(){
    this.createModal=false
  }
}
