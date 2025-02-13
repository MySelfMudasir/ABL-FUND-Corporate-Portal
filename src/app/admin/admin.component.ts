import { Component } from '@angular/core';
import { MainModule } from "../main/main.module";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { StateService } from '../service/state.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any; // if using jQuery-based themes

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MainModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isActive:boolean = false;
  UserByFolio: any = [];
  temp: any = [];
  email: any;
  mobile: any;
  status: any;
  hideform: boolean = false;
  
  constructor(private apiService: ApiService, private stateService: StateService, private router: Router,) {}



  ngOnInit(): void {

  }



  getUserByFolioForm: FormGroup = new FormGroup({
    folio: new FormControl('', Validators.required)
  });



  adminForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });



  onSearch() {
    if (this.getUserByFolioForm.valid) {
      console.log('Form Submitted!', this.getUserByFolioForm.value);
      this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
      this.GetUserByFolio(this.getUserByFolioForm.value);
    } else {
      this.showErrorAlert('All Fields are Required.');
    }
  }



  onSubmit()
  {
    if(this.adminForm.valid)
    {
      console.log('Form Submitted!', this.adminForm.value);
      this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
      this.registerCorpUser(this.temp, this.adminForm.value);
    }
    else{
      this.showErrorAlert('All Fields are Required.');
    }
  }




  GetUserByFolio(folionumber:any) {
    const GetUserByFolioPayload = folionumber ;        
    this.apiService.GetUserByFolio(GetUserByFolioPayload).subscribe(
      (response: any) => {
        console.log('GetUserByFolio Response:', response);
        if (response) {        
        this.temp = response;
        this.UserByFolio = Object.entries({
          folio: response.folio,
          userId: response.userId,
          name: response.name,
          userType: 'Corporate', // Set the userType to 'Corporate'
        }); // This will give you an array of [key, value] pairs
        this.adminForm.patchValue({
          email: response.email,
          mobile: response.mobile,
          status: response.status, // Set the status to the form
        });

        console.log(this.UserByFolio);
        Swal.close();
        this.isActive= true;
        }
        else{
          this.UserByFolio = 'User Not Found';
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.statusText);
      });
  }




  registerCorpUser(folionumberdata:any, data:any) {
    folionumberdata.email = data.email;
    folionumberdata.mobile = data.mobile;
    folionumberdata.status = data.status;

    const registerCorpUserPayload = folionumberdata;
    console.log("registerCorpUserPayload", registerCorpUserPayload);
    this.apiService.registercorpuser(registerCorpUserPayload).subscribe(
      (response: any) => {
        console.log('registercorpUser Response:', response);
        if (response) {        
        Swal.close();
        this.showSuccessAlert();
        this.isActive= false;
        this.getUserByFolioForm.reset();
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.statusText);
      });
  }





  loadingAlert(swalText: string, swalTitle: string) {
    const style = document.createElement('style'); style.innerHTML = `div.swal2-icon { border: none !important;}`;
    document.head.appendChild(style);
    Swal.fire({
      title: swalTitle,
      text: swalText,
      iconHtml: '<i class="fa-solid fa-spinner fa-spin-pulse" style="color: #ff7b00;"></i>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });
  }



  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'User Updated Successfully',
      allowOutsideClick: false,
    });
  }


  showErrorAlert(errorTittle:string) {
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: errorTittle,
      allowOutsideClick: false,
    });
  }




}
