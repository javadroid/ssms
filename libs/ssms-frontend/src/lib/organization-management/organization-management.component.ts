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
  stepper = false;
  stepperactive = false;
  PersonnelRegisterForm!: FormGroup;
  PersonnelDetail: any[] = [];
  stateDetails: any[] = [];
  lgaDetails: any[] = [];
  departmentDetails: any[] = [];
  branchDetails: any[] = [];
  fileData = new FormData();
  fileSelected!: File;
  images!: string;
  personnelImag!: any;
  stepperFirstInfo = false;
  showFilter = false;
  step = 'PrimaryInfo';
  showfiltercriteria = false;
  selectindex!: any;
  showViewDetails = false;
  showAllViewDetails: any;
  steps = ['PrimaryInfo', 'contactInfo'];
  organizationData = [] as any;
  organizationID = this.organizationData[0]?._id;
  organizationcategory = [] as any[];
  organizationName = [] as any[];
  display = [] as any[];
  edits=false;
  constructor(private http: ServiceApi) {}

  OrganizationsignUpForm = new FormGroup({
    id: new FormControl('', []),
    typeOfAgency: new FormControl('', []),
    categoryOfagency: new FormControl('', []),
    organizationName: new FormControl('', []),
    address: new FormControl('', []),
    descriptionOfRole: new FormControl('', []),
    organizationEmail: new FormControl('', []),
    landline: new FormControl('', []),
    firstname: new FormControl('', []),
    lastname: new FormControl('', []),
    middlename: new FormControl('', []),
    rank: new FormControl('', []),
    officialemail: new FormControl('', []),
    officialphone: new FormControl('', []),
    state: new FormControl('', []),
    lga: new FormControl('', []),
    password: new FormControl('', []),
  });

  ngOnInit(): void {
    this.LoadAll();
  }
  showFilterList() {
    this.showFilter = !this.showFilter;
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
    Swal.fire('Password Sent!', 'successfully to' + ' ' + email, 'success');
  }
  Backward() {
    this.firstShow = true;
    this.showSecond = false;
    this.showViewDetails = false;
    this.edits=false
  }

  Edit(data: any) {
    this.OrganizationsignUpForm.patchValue({
      id: data._id,
    });
    console.log('reaching..', this.OrganizationsignUpForm.value);
    this.OrganizationsignUpForm.patchValue(data);
    this.personnelImag = data.personnelImage;
    this.firstShow = false;

    this.selectindex = null;
this.edits=true
     this.LoadAllpersonnel();

  }

  update(){
    if(!this.OrganizationsignUpForm.controls.id.value){
      return
    }
    this.http.update('organization',this.OrganizationsignUpForm.controls.id.value,this.OrganizationsignUpForm.value).subscribe(e=>{
      Swal.fire('Updated!',  e.organizationEmail,  'success');
      this.edits=false
      this.firstShow = true;
    })
  }

  onDelete(item: any) {
    this.http.delete('organization', item._id).subscribe((e) => {
      Swal.fire(
        'Deleted!',
         e.organizationEmail,
        'success'
      );
    });

     this.LoadAllpersonnel();
  }

  // upload(event: any): void {
  //   this.fileSelected = event.target.files[0];
  //   const reader = new FileReader();
  //   // this.personnelImag = reader.result;
  //   const size = Math.round(event.target.files[0].size / 1024);
  //   if (size > 100) {
  //     Swal.fire(
  //       'Warning!',
  //       `The passport exceeded the maximum size, you provided ${size} KB, and the required size is 100 KB`,
  //       'warning'
  //     );
  //     return;
  //   }
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (_event) => {
  //     this.personnelImag = reader.result;
  //   };
  //   console.log(this.fileSelected);

  //   this.fileData.append('file', this.fileSelected, this.fileSelected.name);
  // }

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
            `email: ORG-${e.organizationEmail}, password: ${e.password} `,
          'success'
        );
        this.OrganizationsignUpForm.reset();

         this.LoadAllpersonnel();
         this.firstShow = true;;
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
