import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ssms-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  constructor() {}

  @Input() ID=''

  ngOnInit(): void {}
}
