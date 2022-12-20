import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ssms-crime-header',
  templateUrl: './crime-header.component.html',
  styleUrls: ['./crime-header.component.css'],
})
export class CrimeHeaderComponent {
  @Output() searchEmit = new EventEmitter<string>();
 search = new FormControl('',[Validators.required]);

  onSubmit() {
    if(this.search.value ===''){
      return
    }
    this.searchEmit.emit(this.search.value as string);
  }
}
