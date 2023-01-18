import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.css'],
})
export class OrganizationManagementComponent implements OnInit {
  firstShow = true;
  showSecond = false;
  fileData = new FormData();
  fileSelected!: File;
  images!: string;
  organizationImag!: any;
  showFilter = false;
  showfiltercriteria = false;
  selectindex!: any;
  showViewDetails = false;
  showAllViewDetails: any;

  organizationData = [] as any;
  organizationID = this.organizationData[0]?._id;
  organizationcategory = [] as any[];
  organizationName = [] as any[];
  display = [] as any[];
  edits = false;
  constructor(private http: ServiceApi) {}

  OrganizationsignUpForm = new FormGroup({
    status:new FormControl('', []),
    id:new FormControl('', []),
    password: new FormControl('', []),
  });

  ngOnInit(): void {
    this.LoadAll();
  }
  showFilterDisplay() {
    this.showFilter = !this.showFilter;
  }
  showFilterList(data: any) {

    this.http.find('organization').subscribe((m) => {
      this.organizationData = m.filter((e: { status: any; })=> e.status === data.value);
      // console.log("this.organizationID",this.organizationData[0]?._id)
    });

  }
  showmenu(index: any) {
    this.selectindex = index;
    console.log('selected', this.selectindex, index);
    if (index === this.selectindex) {
      this.showfiltercriteria = !this.showfiltercriteria;
    }
  }
  onCloseMenu() {
    this.showfiltercriteria = false;
  }

  LoadAllpersonnel() {
    this.http.find('organization').subscribe((m) => {
      this.organizationData = m;
      // console.log("this.organizationID",this.organizationData[0]?._id)
    });
  }

  LoadAll() {
    this.LoadAllpersonnel();
  }

  createNew() {
    this.OrganizationsignUpForm.reset();
    this.firstShow = false;
    this.showSecond = true;
  }
  SendPassword(data: any) {
    const email = data.organizationEmail;
    this.selectindex = null;
    this.OrganizationsignUpForm.patchValue(data);
    this.OrganizationsignUpForm.patchValue({ id: data._id });
    this.passwordGenerate();

    this.http
      .update('organization',  data._id,{
        password: this.OrganizationsignUpForm.value.password,
      })
      .subscribe((e) => {
        Swal.fire(
          'Password Sent!',
          'successfully to' +
            ' ' +
            e.organizationEmail +
            '   ' +
            this.OrganizationsignUpForm.value.password,
          'success'
        );

        this.http
          .sendMail('send-mail', {
            name: e.organizationName,
            email: e.organizationEmail,
            password: this.OrganizationsignUpForm.value.password,
          })
          .subscribe((e1) => {
            console.log('this.OrganizationsignUpForm.value', e1);
          });
      });
  }
  Backward() {
    this.firstShow = true;
    this.showSecond = false;
    this.showViewDetails = false;
    this.edits = false;
  }

  Edit(data: any) {
    this.http
      .update('organization', data._id, { profile: 'NOTCOMPLETEDPROFILE' })
      .subscribe((e) => {
        Swal.fire('Organization can proceed in editing their data!', e.organizationEmail, 'success');
        this.LoadAllpersonnel();
      });
  }

  update() {
    if (!this.OrganizationsignUpForm.controls.id.value) {
      return;
    }
    this.http
      .update(
        'organization',
        this.OrganizationsignUpForm.controls.id.value,
        this.OrganizationsignUpForm.value
      )
      .subscribe((e) => {
        this.LoadAllpersonnel();
        Swal.fire('Updated!', e.organizationEmail, 'success');
        this.edits = false;

        this.firstShow = true;
      });
  }

  onDelete(item: any) {
    this.http.delete('organization', item._id).subscribe((e) => {
      Swal.fire('Deleted!', e.organizationEmail, 'success');
      this.LoadAllpersonnel();
    });


  }

  onDisable(item: any) {
    this.http
      .update('organization', item._id, { status: 'DISABLE' })
      .subscribe((e) => {
        Swal.fire('Disable!', e.organizationEmail, 'success');
        this.LoadAllpersonnel();
      });
  }

  onEnable(item: any) {
    this.http
      .update('organization', item._id, { status: 'ACTIVE' })
      .subscribe((e) => {
        Swal.fire('Enable!', e.organizationEmail, 'success');
        this.LoadAllpersonnel();
      });
  }
  View(item: any) {
    this.showViewDetails=true;
    this.showAllViewDetails=item
  }
  back(){
    this.showViewDetails=false;
  }
  onRegister(item: any) {
    this.http
      .update('organization', item._id, { password: '', status: 'ACTIVE' })
      .subscribe((e) => {
        this.selectindex = null;
        this.OrganizationsignUpForm.patchValue(item);
        this.OrganizationsignUpForm.patchValue({ id: item._id });
        this.passwordGenerate();
        this.http
          .update('organization', item._id, {
            password: this.OrganizationsignUpForm.value.password,
          })
          .subscribe((e) => {
            Swal.fire(
              'Password Sent!',
              'successfully to' +
                ' ' +
                e.organizationEmail +
                '   ' +
                this.OrganizationsignUpForm.value.password,
              'success'
            );

            this.http
              .sendMail('send-mail', {
                name: e.organizationName,
                email: e.organizationEmail,
                password: this.OrganizationsignUpForm.value.password,
              })
              .subscribe((e1) => {
                console.log('this.OrganizationsignUpForm.value', e1);
              });
          });

          this.LoadAllpersonnel()
      });
  }


  onSubmit(): void {
    this.passwordGenerate();

    this.http
      .create('organization', this.OrganizationsignUpForm.value)
      .subscribe((e) => {
        this.display = [
          { email: 'ORG-' + e.organizationEmail, password: e.password },
        ];
        Swal.fire(
          'Created',
          'successfully ' +
            ' ' +
            `email: ORG-${e.organizationEmail}, password: ${this.OrganizationsignUpForm.value.password} `,
          'success'
        );
        this.OrganizationsignUpForm.reset();

        this.LoadAllpersonnel();
        this.firstShow = true;
      });
  }

  passwordGenerate() {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = '1234567890';
    const specials = '!@#$%.&';
    const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
    let opt, choose;
    let pass = '';
    for (let i = 0; i < 8; i++) {
      opt = Math.floor(Math.random() * options.length);
      choose = Math.floor(Math.random() * options[opt].length);
      pass = pass + options[opt][choose];
      options.splice(opt, 1);
    }
    console.log(pass);

    this.OrganizationsignUpForm.patchValue({
      password: pass,
    });
  }
}
