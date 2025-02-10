import { Component} from '@angular/core';
import { MainModule } from '../main/main.module';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [
    MainModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent
  ],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.css'
})
export class ConfirmOTPComponent {
  isNewPasswordVisible = false;
  isConfirmPasswordVisible = false;
  data: any | null;
  // folio: string | null;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private stateService: StateService) { 

    this.data = sessionStorage.getItem('SignupUserData');  // Retrieve data from sessionStorage
    if (this.data) {
      this.data = JSON.parse(this.data);  // Correct method is JSON.parse()
      if (this.data) {
        this.signup.patchValue({
          folio: this.data.folio
        });
      }
    } else {
      // Handle the case where 'SignupUserData' is not found in sessionStorage
      console.error('No SignupUserData found in sessionStorage');
    }

  }

  ngOnInit(): void {
    this.stateService.resendOtp$.subscribe(() => {
      this.reSendOtp();
    });

  }


  signup: FormGroup = new FormGroup({
    folio: new FormControl(['', Validators.required]),
    otp: new FormControl('', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    cPassword: new FormControl('', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
  });



  onSubmit() {
    if (this.signup.valid) {
      console.log('Form data:', this.signup.value);
      this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
      if(this.signup.value.password !== this.signup.value.cPassword){
        this.showErrorAlert('Password does not match.');
        return;
      }
      else
      {
        this.confirmUser();
      }
    } else {
      this.showErrorAlert('All Fields are Required.');
    }
  }



  reSendOtp() {
    console.log('resend');
    if (this.data) {
      console.log('Resend OTP Data:', this.data);
      this.apiService.Signup(this.data).subscribe(
        (response: any) => {
          if (response.responseCode == "SUCCESS") {
            console.log('Resend OTP Response:', response);
          }
          else{
            this.showErrorAlert('Invalid User ID or Password');
          }
        },
        (error: any) => {
          console.error('Error posting data', error);
          this.showErrorAlert(error.statusText);
        });
    } else {
      console.error('No SignupUserData found in sessionStorage');
    }
  }




  confirmUser() {    
    const { otp, password, folio } = this.signup.value; // Extract only the needed values
    const requestData = { otp, password, folio };
    console.log(requestData);
    
    this.apiService.VerifyOtpAndRegisterUser(requestData).subscribe(
      (response: any) => {
      if (response.responseCode == "00") {
        console.log('Signup Response:', response);
        setTimeout(() => {
          Swal.close();
            this.showSuccessAlert();
            setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login
            }, 1000); // Delay of 2 seconds before redirecting
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
    

    toggleNewPasswordVisibility(): void {
      this.isNewPasswordVisible = !this.isNewPasswordVisible;
    }
    toggleConfirmPasswordVisibility(): void {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
    
    
    showSuccessAlert() {
      Swal.fire({
        icon: 'success',
        title: 'Account activated successfully',
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
