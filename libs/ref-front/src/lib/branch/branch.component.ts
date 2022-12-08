import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'ssms-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {

  constructor(private http:ApiService) {}
  dataAll=[] as any[]
  branchForm=new FormGroup({
    subcriberId: new FormControl('', []),
    branchName: new FormControl('', [])
  })


  ngOnInit(): void {
    this.http.find('branch' ).subscribe(e=>{
    this.dataAll=e
    })
  }
  onDelete() {

    this.http.delete('branch',)
    }
    onEdit() {
    this.http
    }

  onCreate(){
console.log(this.branchForm.value)
  }
}
