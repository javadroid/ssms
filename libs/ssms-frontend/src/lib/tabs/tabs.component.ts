import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ssms-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  constructor() {}
  active =false;
  ngOnInit(): void {}

  
  openCity(tabs:boolean){
    this.active = tabs;
  }

  
}
