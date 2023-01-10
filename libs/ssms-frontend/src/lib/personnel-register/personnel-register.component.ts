import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ServiceApi } from '../shared/service/service-api';
import Swal from 'sweetalert2';

@Component({
  selector: 'ssms-personnel-register',
  templateUrl: './personnel-register.component.html',
  styleUrls: ['./personnel-register.component.css'],
})
export class PersonnelRegisterComponent implements OnInit {
  firstShow = true;
  showSecond = false;
  stepper = false;
  stepperactive = false;
  PersonnelRegisterForm!: FormGroup;
  PersonnelDetail: any[] = [];
  rankDetails: any[] = [];
stationDetails: any[] = [];
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
  organizationData=[] as any
  organizationID=this.organizationData[0]?._id;
  constructor(
    private http: ServiceApi,
    private personnelformbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.organizationID=this.organizationData[0]?._id;
    this.LoadAll();


    this.PersonnelRegisterForm = this.personnelformbuilder.group({
      typeofagency: [''],
      categoryofagency: [''],
      nameoforganization: [''],
      address: [''],
      descriptionofrole: [''],
      department: [''],
      station: [''],
      organizationsemail: [''],
      landline: [''],
      firstname: [''],
      lastname: [''],
      middlename: [''],
      rank: [''],
      officialemail: [''],
      officialphone: [''],
      stateofservice: [''],
      lgaofservice: [''],
      divisionhead: [''],
      phone: [''],
      email: [''],
      branch: [''],
      refNunmber: [''],
      organizationId: [this.organizationData[0]?._id],
      id: [''],
       password:[''],
      personnelImage: [''],
    });

    console.log(this.organizationData)
  }
  showFilterList() {
    this.showFilter = !this.showFilter;
  }
  outerclick(event: any) {
    console.log('see event', this.showfiltercriteria, this.selectindex, event);

    event.stopPropagation();
  }
  View(dataview: any) {
    this.showViewDetails = true;
    this.firstShow = false;
    this.selectindex = null;
    this.showAllViewDetails = dataview;
    this.personnelImag = dataview.personnelImage;
  }
  showmenu(index: any) {
    this.selectindex = index;
    console.log('selected', this.selectindex, index);
    if (index === this.selectindex) {

      this.showfiltercriteria =  !this.showfiltercriteria ;
    }
  }
  onCloseMenu(){
    this.showfiltercriteria =  false;
  }
  onNext(step: string) {
    this.step = step;
    if (step === this.steps[1]) {
      this.stepperFirstInfo = true;
    } else {
      this.stepperFirstInfo = false;
    }
  }
  LoadAllpersonnel() {
    this.http.find('personnel').subscribe((m) => {
      this.PersonnelDetail = m.filter(
        (n: { organizationId: string }) =>
          n.organizationId === this.organizationID
      );
      console.log("this.organizationID",this.PersonnelDetail,m,this.organizationData[0]?._id,this.organizationID)
    });
  }
  loadDepartment() {
    this.http.find('department').subscribe((m) => {
      this.departmentDetails = m.filter(
        (n: { subscriberId: string }) =>
          n.subscriberId === this.organizationID
      );
    });
  }
  loadBanch() {
    this.http.find('branch').subscribe((m) => {
      this.branchDetails = m.filter(
        (n: { subscriberId: string }) =>
          n.subscriberId === this.organizationID
      );
    });
  }
  loadStation() {
    this.http.find('station').subscribe((m) => {
      this.stationDetails = m.filter(
        (n: { subscriberId: string }) =>
          n.subscriberId === this.organizationID
      );
    });
  }
  loadState() {
    this.http.find('states').subscribe((m) => {
      console.log('state', m);
      this.stateDetails = m;
    });
  }
  loadRank() {

    this.http.find('rank').subscribe(e=>{this.rankDetails =e.filter((id:any)=>{ return id.subscriberId===this.organizationID}); })

  }
  onStateChange(event: any) {
    this.loadLGA(event.value);
  }
  loadLGA(stateId: any) {
    this.http.find('lga').subscribe((m) => {
      this.lgaDetails = m.filter(
        (n: { stateId: any }) => n.stateId === stateId
      );
      console.log('state', this.stateDetails);
    });
  }
  LoadAll() {
    this.loadState();
    this.LoadAllpersonnel();
    this.loadDepartment();
    this.loadBanch();
    this.loadStation()
    this.loadRank()
  }

  createNew() {
    this.PersonnelRegisterForm.reset();
    this.firstShow = false;
    this.showSecond = true;
  }
  SendPassword(data: any) {
    const email = data.email;
    this.selectindex = null;

    this.PersonnelRegisterForm.patchValue(data)
    this.PersonnelRegisterForm.patchValue({id:data._id})
    this.passwordGenerate()
    this.http.resetpassword('personnel',{password:this.PersonnelRegisterForm.value}).subscribe(e=>{
      console.log(";jb/jbn/kjb;ku",e)
      Swal.fire('Password Sent!', 'successfully to' + ' ' + e.email +'   '+this.PersonnelRegisterForm.value.password, 'success');


    })
  }
  Backward() {
    this.firstShow = true;
    this.showSecond = false;
    this.showViewDetails = false;
  }
  Edit(data: any) {
    this.PersonnelRegisterForm.patchValue({
      id: data._id,
    });
    console.log('reaching..', this.PersonnelRegisterForm.value);
    this.PersonnelRegisterForm.patchValue(data);
    this.personnelImag = data.personnelImage;
    this.firstShow = false;
    this.showSecond = true;
    this.selectindex = null;
  }

  upload(event: any): void {
    this.fileSelected = event.target.files[0];
    const reader = new FileReader();
    // this.personnelImag = reader.result;
    const size = Math.round(event.target.files[0].size / 1024);
    if (size > 100) {
      Swal.fire(
        'Warning!',
        `The passport exceeded the maximum size, you provided ${size} KB, and the required size is 100 KB`,
        'warning'
      );
      return;
    }
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.personnelImag = reader.result;
    };
    console.log(this.fileSelected);

    this.fileData.append('file', this.fileSelected, this.fileSelected.name);
  }
  onDelete(item: any) {
    this.http.delete('personnel', item._id).subscribe((e) => {
      Swal.fire(
        'Deleted!',
         e.email,
        'success'
      );
    });

     this.LoadAllpersonnel();
  }

  SubmitPersonnel() {


    const data = this.PersonnelRegisterForm.value;
    this.passwordGenerate()
    if (data.id) {
      this.PersonnelRegisterForm.removeControl('Password')
      this.PersonnelRegisterForm.removeControl('organizationId')
      console.log(this.PersonnelRegisterForm.value);
      this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
        this.images = uploadUrl[0];
        data.personnelImage = this.images;
        data.organizationId = this.organizationID;

        console.log('path1:', data);
        this.http.update('personnel', data.id, data).subscribe((n) => {
          Swal.fire('Success!', 'Update successfully.', 'success');
          this.PersonnelRegisterForm.reset();
          this.LoadAllpersonnel();
          this.firstShow = true;
          this.showSecond = false;
        });
      });
    } else {
      this.http.upload('document', this.fileData).subscribe((uploadUrl) => {
        this.images = uploadUrl[0];

        this.PersonnelRegisterForm.value.personnelImage = this.images;
        this.PersonnelRegisterForm.patchValue({
          personnelImage:this.images,
          organizationId:this.organizationData[0]?._id
        })
        console.log(this.PersonnelRegisterForm.value);
        this.http.create('personnel', this.PersonnelRegisterForm.value).subscribe((n) => {
          Swal.fire('Success!', n.email +'   '+this.PersonnelRegisterForm.value.password, 'success');
          console.log("ersonnelRegisterForm.",n);
          this.PersonnelRegisterForm.reset();
          this.personnelImag = '';
          this.LoadAllpersonnel();
          this.firstShow = true;
          this.showSecond = false;
        });
      });
    }
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

    this.PersonnelRegisterForm.patchValue({
      password: pass,
    });
  }
}
