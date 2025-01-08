import { Component} from '@angular/core';
import { MainModule } from '../main/main.module';
import { ApiService } from '../service/api.service';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { SpinnerComponent } from '../spinner/spinner.component';
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


  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.resendOtp$.subscribe(() => {
      this.reSendOtp();
    });

  }


  signup: FormGroup = new FormGroup({
    otp: new FormControl('1234', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    password: new FormControl('0000000000', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    cPassword: new FormControl('0000000000', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),

  });



  onSubmit() {
    if (this.signup.valid) {
      console.log('Form data:', this.signup.value);
      this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
      // this.consumerTokenPost();
    } else {
      this.showErrorAlert('All Fields are Required.');
    }
  }



  reSendOtp() {
    console.log('resend');
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
    
    
    showErrorAlert(errorTittle:string) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorTittle,
        allowOutsideClick: false,
      });
    }

}
