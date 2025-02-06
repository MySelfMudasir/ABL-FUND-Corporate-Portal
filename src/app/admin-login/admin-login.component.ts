import { Component } from '@angular/core';
import { MainModule } from '../main/main.module';
import { ApiService } from '../service/api.service';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    MainModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  data: any;
  swalTitle: string = '';
  swalText: string = '';
  isCurrentPasswordVisible = false;



  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private stateService: StateService) { }


  ngOnInit(): void {

    if (this.isAuthenticated()) {
      this.router.navigate(['admin-login']);
    }

  }
  



  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('globalAuthToken'); // Check if token exists
  }
  


  login: FormGroup = new FormGroup({
    adminId: new FormControl('Super', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    adminPassword: new FormControl('Superadmin', [
      Validators.required,
      // Validators.minLength(6),
      // Validators.maxLength(6),
      // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
    ]),

  });



  onSubmit() {
    if (this.login.valid) {
      console.log('Form data:', this.login.value);
      this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
      this.generateTokenPost();
    } else {
      this.showErrorAlert('All Fields are Required.');
    }
  }


  generateTokenPost() {
    const userId = 'AmcServiceConsumer'
    const userPwd = 'AmcServiceConsumer@12345678';
    const tokenPayload = { userId, userPwd };
    // console.log('Data being posted:', tokenPayload);
    this.apiService.generateTokenPost(tokenPayload).subscribe(
      (response: any) => {
        // console.log(response);
        if (response) 
        {
          this.data = response;
          this.authService.login(response.token);
          console.log('Data posted successfully', this.data);
          if(this.data.token != null)
          {
            this.AuthenticateAdmin();
          }
          else
          {
            this.showErrorAlert('Null Response');
          }
        }
        else{
          this.loadingAlert('No Response', 'The server did not return any response.');
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.statusText);
      });
  }





  AuthenticateAdmin() {
    // if(this.login.value.adminid == 'Admin' && this.login.value.adminpwd == 'Admin123')
    // {
    //   this.stateService.setAccountTitle('Admin');
    //   this.stateService.setAccountNumber('Admin');
    //   this.stateService.setUserId('Admin');
    //   setTimeout(() => {
    //     Swal.close();
    //     this.router.navigate(['admin']); // Redirect to dashboard
    //   }, 1000);
    // }
    // if(this.login.value.adminid == 'Super' && this.login.value.adminpwd == 'Superadmin')
    // {
    //   this.stateService.setAccountTitle('Admin');
    //   this.stateService.setAccountNumber('Admin');
    //   this.stateService.setUserId('Admin');
    //   setTimeout(() => {
    //     Swal.close();
    //     this.router.navigate(['super-admin']); // Redirect to dashboard
    //   }, 1000);
    // }
    
    
    this.apiService.AuthenticateAdmin(this.login.value).subscribe(
      (response: any) => {
        console.log('Authentication Response:', response);
        
        if (response.responseCode == "SUCCESS") {
          if(response.responseMessage == "Admin Login Success. Role: I"){
              this.stateService.setAccountTitle('Admin');
              this.stateService.setAccountNumber('Admin');
              setTimeout(() => {
                Swal.close();
                this.router.navigate(['admin']);
              }, 1000);
          }
          if(response.responseMessage == "Admin Login Success. Role: U"){
              this.stateService.setAccountTitle('Super Admin');
              this.stateService.setAccountNumber('Super Admin');
              setTimeout(() => {
                Swal.close();
                this.router.navigate(['super-admin']);
              }, 1000);
          }
        }
        else{
          this.showErrorAlert('Invalid User ID or Password');
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.statusText);
      });
  }



  toggleCurrentPasswordVisibility(): void {
    this.isCurrentPasswordVisible = !this.isCurrentPasswordVisible;
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
  
  
  
  showErrorAlert(errorTittle:string) {
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: errorTittle,
      allowOutsideClick: false,
    });
  }





}
