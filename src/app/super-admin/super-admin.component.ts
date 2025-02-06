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
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent {
  isActive:boolean = false;
  UserByFolio: any = [];
  temp: any = [];
  email: any;
  mobile: any;
  hideform: boolean = false;
  addedUsers: any[] = [];

  constructor(private apiService: ApiService, private stateService: StateService, private router: Router,) {}



  ngOnInit(): void {
    this.GetAddedUsers();   
  }



  GetAddedUsers() {
    this.apiService.GetAddedUsers().subscribe(
      (response: any) => {
        console.log('GetAddedUsers Response:', response);
        if (response) {  
          this.addedUsers = response;                
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



  approveUser(folio:any) {
    const UpdateUserPayload = this.addedUsers.find((user: any) => user.folio === folio);
    UpdateUserPayload.status = 'A';
    console.log("UpdateUserPayload", UpdateUserPayload);
    this.apiService.UpdateUser(UpdateUserPayload).subscribe(
      (response: any) => {
        console.log('UpdateInputedUsers Response:', response);
        if (response) {        
          Swal.close();
          this.showSuccessAlert();
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.statusText);
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
