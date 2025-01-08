import { Component } from '@angular/core';
import { MainModule } from "../main/main.module";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { StateService } from '../service/state.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
declare var $: any; // if using jQuery-based themes



@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    MainModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  isActive:boolean = false;
  minDate: string = ''; // Variable to hold the minimum date
  maxDate: string = ''; // Variable to hold the maximum date
  fundsNames: any[] = [];
  pdfBase64: string  = '';

  constructor(private apiService: ApiService, private stateService: StateService, private router: Router,) {}



  ngOnInit(): void {
    // Re-initialize your theme (if using Bootstrap or similar)
    this.initializeThemeComponents();

    // Set minimum date to January 1, 2020
    const minDate = new Date('2020-01-01');
    this.minDate = minDate.toISOString().split('T')[0];
    // Set maximum date to today's date
    const maxDate = new Date();
    this.maxDate = maxDate.toISOString().split('T')[0];
  }




  reportForm: FormGroup = new FormGroup({
    reportName: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    fundCode: new FormControl('', Validators.required)
  });



  onChange()
  {
    console.log('Form Submitted!', this.reportForm.value);
    this.initializeThemeComponents();
    this.GetFundsNames();
    this.isActive= true;
  }


  onSubmit() {
    if (this.reportForm.valid) {
      console.log('Form Submitted!', this.reportForm.value);
      this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
      this.generateReport();
    } else {
      this.showErrorAlert('All Fields are Required.');
    }
  }



  // isAccountStatementSelected() {
  //   return this.reportForm.get('reportName')?.value === 'account_statement';
  // }


  generateReport() {

    // const globalAuthToken = sessionStorage.getItem('globalAuthToken');
    const globalAuthToken = this.stateService.getGlobalAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Mbs645 ${globalAuthToken}`,
      'Content-Type': `application/json`
    });


    const generateReportPayload = {
      folioNumber : this.stateService.getAccountNumber(),
      fromDate : this.reportForm.value.fromDate,
      fundCode : this.reportForm.value.fundCode,
      planId : 'all',
      reportName : this.reportForm.value.reportName,
      reportType : 'cis',
      sessionId : this.stateService.getGlobalAuthToken(),
      toDate : this.reportForm.value.toDate,
      userId : this.stateService.getUserId(),
    };
    console.log('Data being posted:', generateReportPayload);
    

    this.apiService.GenerateReport(generateReportPayload, headers).subscribe(
      (response: any) => {
        console.log('GetPortfolioAllocationDetail Response:', response);
        if (response) {    
          Swal.close();
          this.openPdf(response.reportsDto.result);
        }
        else{
          this.loadingAlert('No Response', 'The server did not return any response.');
        }
        this.initializeThemeComponents();
      },
      (error: any) => {
        console.error('Error posting data', error);
        // this.showErrorAlert(error.message);
      });
  }



  GetFundsNames() {
    const globalAuthToken = sessionStorage.getItem('globalAuthToken');
    const headers = new HttpHeaders({
      'Authorization': `Mbs645 ${globalAuthToken}`
    });
    
    const folionumber = this.stateService.getAccountNumber();
    const GetFundsNamesPayload = { folionumber };    
    
    this.apiService.GetFundsNames(GetFundsNamesPayload, headers).subscribe(
      (response: any) => {
        console.log('GetFundsNames Response:', response);
        if (response) {        
          this.fundsNames = [];
          response.forEach((allocation: any) => {
            this.fundsNames.push(allocation);
          });
        }
        else{
          this.fundsNames = [];
          this.fundsNames.push('No Funds');
        }
        this.initializeThemeComponents();
      },
      (error: any) => {
        console.error('Error posting data', error);
        // this.showErrorAlert(error.message);
      });
  }



  openPdf(pdfBase64: string) {
    // Convert base64 to Uint8Array
    const byteCharacters = atob(pdfBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    // Create a Blob from the Uint8Array
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);
    // Open the PDF in a new tab
    window.open(blobUrl, '_blank');
  }



  
  initializeThemeComponents()
  {
    // Re-initialize your theme (if using Bootstrap or similar)
    $(document).ready(function() {
      $('.selectpicker').selectpicker(''); // Example for Bootstrap
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



  showErrorAlert(errorTittle:string) {
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: errorTittle,
      allowOutsideClick: false,
    });
  }




}
