import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'ssms-organization-update',
  templateUrl: './organization-update.component.html',
  styleUrls: ['./organization-update.component.css'],
})
export class OrganizationUpdateComponent {

  organizationForm = new FormGroup({
    address:new FormControl('', [Validators.required]),
    descriptionOfRole:new FormControl('', [Validators.required]),
    organizationEmail:new FormControl('', [Validators.required, Validators.email]),
    landline:new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    middlename: new FormControl('', [Validators.required]),
    rank: new FormControl('', [Validators.required]),
    officialphone: new FormControl('', [Validators.required]),
    status: new FormControl('ACTIVE')
  });

  step = 'organizationInfo';

  steps = ['organizationInfo', 'contactInfo'];

  constructor(
    private apiService: ServiceApi,
    private toast: HotToastService,
    ) {}

    onNext(step: string) {
      this.step = step;
    }

  onSubmit() {
    if(this.organizationForm.invalid) {
      this.toast.success('Please fill the required fields!', {
        duration: 5000,
        position: 'top-center',
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
          fontSize: '18px'
        },
      });
      return
    }

    this.apiService.create('organization', this.organizationForm.value).pipe(
      this.toast.observe({
        loading: 'Updating organization...',
        success: 'Proceed to dashboard!',
        error: 'Could not update organization.',
      }),
    ).subscribe();

  }

}
