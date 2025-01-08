import { Component } from '@angular/core';
import { MainModule } from '../main/main.module';
import { ApiService } from '../service/api.service';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MainModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private stateService: StateService) { }


  ngOnInit(): void {
    
  }


  signup: FormGroup = new FormGroup({
    userid: new FormControl('ABLAMC030908', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    cnic: new FormControl('3100000000000000000', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    mobile: new FormControl('03000000000', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),
    email: new FormControl('admin@gmail.com', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
    ]),

  });



  onSubmit() {
    this.SignUp();

    // if (this.signup.valid) {
    //   console.log('Form data:', this.signup.value);
    //   this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
    //   this.SignUp();
    // } else {
    //   this.showErrorAlert('All Fields are Required.');
    // }
  }



  SignUp() {
    this.router.navigate(['/confirm-otp']); // Redirect to confirm otp
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
