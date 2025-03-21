import { Component } from '@angular/core';
import { MainModule } from '../main/main.module';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MainModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  data: any;
  swalTitle: string = '';
  swalText: string = '';
  isCurrentPasswordVisible = false;



  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private stateService: StateService) { }


  ngOnInit(): void {

    // keep login if user is authenticated
    // this.authService.isAuthenticated$.subscribe(isAuthenticated => {
    //   console.log('isAuthenticated:', isAuthenticated);      
    //   if (isAuthenticated) {
    //   this.router.navigate(['dashboard']);
    //   }
    // });


    if (this.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }

    
  }
  



  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('globalAuthToken'); // Check if token exists
  }
  


  login: FormGroup = new FormGroup({
    userid: new FormControl('', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    userpwd: new FormControl('', [
      Validators.required,
      // Validators.minLength(6),
      // Validators.maxLength(6),
      // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
    ]),

  });



  onSubmit() {
    if (this.login.valid) {
      console.log('Form data:', this.login.value);
      const formValues = this.login.value;
      formValues.userid = formValues.userid.trim();
      formValues.userpwd = formValues.userpwd.trim();
      
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
            this.AuthenticateUser();
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





  AuthenticateUser() {
    this.apiService.AuthenticateUser(this.login.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.responseCode == "SUCCESS") {
          // console.log('Authentication Response:', response);
          this.stateService.setAccountTitle(response.accountList[0].accountTitle);
          this.stateService.setAccountNumber(response.accountList[0].accountNumber);
          const capitalizedUserId = response.accountList[0].userId.toUpperCase();
          this.stateService.setUserId(capitalizedUserId);
          setTimeout(() => {
            Swal.close();
            this.router.navigate(['dashboard']); // Redirect to dashboard
          }, 1000);
        }
        else if (response.responseCode == "99") {
          // console.log('Authentication Response:', response);
          // this.stateService.setAccountTitle(response.accountList[0].accountTitle);
          // this.stateService.setAccountNumber(response.accountList[0].accountNumber);
          const capitalizedUserId = this.login.get('userid')?.value.toUpperCase();
          this.stateService.setUserId(capitalizedUserId);
          setTimeout(() => {
            Swal.close();
            this.router.navigate(['direct-change-password']); // Redirect to dashboard
          }, 1000);
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
