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

  constructor(private apiService: ApiService, private stateService: StateService, private router: Router,) {}



  ngOnInit(): void {

  }



  getUserByFolioForm: FormGroup = new FormGroup({
    folio: new FormControl('7', Validators.required)
  });



  adminForm: FormGroup = new FormGroup({
    email: new FormControl('mudasir@yahoo.com', Validators.required),
    mobile: new FormControl('923006191888', Validators.required),
    status: new FormControl('A', Validators.required)
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
      this.UpdateUser(this.temp, this.adminForm.value);
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
          userType: response.userType,
          status: response.status,
        }); // This will give you an array of [key, value] pairs
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
        this.showErrorAlert(error.message);
      });
  }




  UpdateUser(folionumberdata:any, data:any) {  
    folionumberdata.email = data.email;
    folionumberdata.mobile = data.mobile;
    folionumberdata.status = data.status;
    const UpdateUserPayload = folionumberdata;
    console.log("UpdateUserPayload", UpdateUserPayload);
    this.apiService.UpdateUser(UpdateUserPayload).subscribe(
      (response: any) => {
        console.log('UpdatedUser Response:', response);
        if (response) {        
        Swal.close();
        this.showSuccessAlert();
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.message);
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
