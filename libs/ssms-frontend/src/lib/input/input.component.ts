import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms'

@Component({
  selector: 'ssms-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  
  @Input() control=new FormControl;
  
  constructor() {}

  ngOnInit(): void {}
  
  showErrors(){
    return control.touched && control.errors;
  }
}
