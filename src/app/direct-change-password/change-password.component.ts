import { Component } from '@angular/core';
import { MainModule } from "../main/main.module";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';
import { StateService } from '../service/state.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
declare var $: any; // Assumes you have jQuery available


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MainModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class DirectChangePasswordComponent {
  userid:string = '';
  isCurrentPasswordVisible:boolean = false;
  isNewPasswordVisible:boolean = false;
  isRePasswordVisible:boolean = false;


  constructor(private router: Router, private apiService: ApiService, private stateService: StateService) { }

  ngOnInit(): void {
    this.userid = this.stateService.getUserId();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        $('[data-bs-toggle="tooltip"]').tooltip();
      }
    });

  }


  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  toggleCurrentPasswordVisibility(): void {
    this.isCurrentPasswordVisible = !this.isCurrentPasswordVisible;
  }

  toggleNewPasswordVisibility(): void {
    this.isNewPasswordVisible = !this.isNewPasswordVisible;
  }

  toggleRePasswordVisibility(): void {
    this.isRePasswordVisible = !this.isRePasswordVisible;
  }

  
  changePassword: FormGroup = new FormGroup({
    oldpwd: new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
      // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
    ]),
    newpwd: new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
      // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
    ]),
    reenterpwd: new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
      // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
    ]),
  });



  onSubmit() {
    if (this.changePassword.valid) {
      // console.log('Form data:', this.changePassword.value);
      this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
      if(this.changePassword.value.oldpwd === this.changePassword.value.newpwd){
        this.showErrorAlert('Old Password and New Password cannot be same.');
        return;
      }
      else if(this.changePassword.value.newpwd != this.changePassword.value.reenterpwd){
        this.showErrorAlert('Password does not match.');
        return;
      }
      else
      {
        this.ChangePassword();
      }
      this.ChangePassword();

    } 
    else {
      this.showErrorAlert('All Fields are Required.');
    }
  }




  ChangePassword() {    
    const changePasswordPayload = {
      userid: this.stateService.getUserId(),
      ...this.changePassword.value
    };

    this.apiService.ChangePassword(changePasswordPayload).subscribe(
      (response: any) => {
        console.log('ChangePassword Response:', response);
        if (response.responseCode === 'INVALID_DETAILS') {
          this.showErrorAlert(response.responseMessage, 'error', 'Failed');

        }
        else if (response.responseCode === 'SUCCESS') {
          this.showErrorAlert(response.responseMessage, 'success', 'Success');

        }
        else{
          this.showErrorAlert('The server did not return any response.');
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
    });
  }
  
  
  
  showErrorAlert(errorTittle:string, errorIcon?: any, errorText?: any) {
    Swal.fire({
      icon: errorIcon,
      title: errorText,
      text: errorTittle,
    });
  }



}
