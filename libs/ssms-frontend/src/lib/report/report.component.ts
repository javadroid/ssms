import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ssms-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('first')
  }
}
