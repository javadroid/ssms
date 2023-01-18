/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { ServiceApi } from '../shared/service/service-api';


@Component({
  selector: 'ssms-organization-signup',
  templateUrl: './organization-signup.component.html',
  styleUrls: ['./organization-signup.component.css'],
})
export class OrganizationSignupComponent implements OnInit {
  OrganizationsignUpForm = new FormGroup({
    organizationName: new FormControl('', []),
    address: new FormControl('', []),
    descriptionOfRole: new FormControl('', []),
    organizationEmail: new FormControl('', []),
    officialPhone: new FormControl('', []),

  });

    private apiService = inject(ServiceApi);
    private router  = inject(Router);


  ngOnInit(): void {}

  onSubmit() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.apiService.create('organization', this.OrganizationsignUpForm.value).pipe(
      finalize(() => Swal.fire('Thank you, we will follow up', 'success'))
    ).subscribe((data: any) => {
      this.router.navigate(['/']);
    });
  }
}
