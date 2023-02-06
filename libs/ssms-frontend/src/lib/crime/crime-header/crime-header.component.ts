import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ssms-crime-header',
  templateUrl: './crime-header.component.html',
  styleUrls: ['./crime-header.component.css'],
})
export class CrimeHeaderComponent  implements OnInit {
  @Output() searchEmit = new EventEmitter<string>();
 search = new FormControl('',[Validators.required]);
isp=false
 ngOnInit(): void{
  const isp = localStorage.getItem('@isPersonnel');
  if(isp&& isp==='true') {
this.isp=true
  }
 }
  onSubmit() {
    if(this.search.value ===''){
      return
    }
    this.searchEmit.emit(this.search.value as string);
  }
}
