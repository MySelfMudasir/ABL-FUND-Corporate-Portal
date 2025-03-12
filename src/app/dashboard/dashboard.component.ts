import { Component, ViewChild } from '@angular/core';
import { MainModule } from '../main/main.module';
import { ChartComponent } from "../chart/chart.component";
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { StateService } from '../service/state.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
// Assumes you have jQuery available
declare var $: any; 


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MainModule,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalBalanceAmount:string = '';
  cisInvestmentValue:string = '';
  asOnDate:string = '';
  folionumber:string = '';
  transexecuted:string = 'EXECUTED';
  transactionDetail: any[] = [];

  isButtonDisabled:boolean = true;
  isInProcessActive: boolean = false;
  isExecutedActive: boolean = true;
  
  sortKey = ''; // Default sorting key
  sortOrder = 'asc'; // Default ascending order
  chartVisibility: boolean = true;

  
  @ViewChild('chart1', { static: true }) chart1!: ChartComponent;
  @ViewChild('chart2', { static: true }) chart2!: ChartComponent;

  
  constructor(private apiService: ApiService, private stateService: StateService, private router: Router,) {} 
  
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  
  ngOnInit(): void {

    // window.addEventListener('beforeunload', (event) => {
    //   // This will show a generic confirmation dialog
    //   const confirmationMessage = 'Are you sure you want to leave?';
    //   event.returnValue = confirmationMessage; // Modern browsers require this
    //   return confirmationMessage; // For compatibility with older browsers
    // });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        $('#carouselExampleIndicators').carousel();
      }
    });
  


    this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
    this.folionumber = this.stateService.getAccountNumber();
    this.PortfolioSummary();
    this.cnicPortfolioDetail();
    // this.portfolioAllocationDetail(); 
    this.getTransactionDetail(this.transexecuted);
    
    // setTimeout(() => {   
    //   this.chartVisibility = false; // This will trigger the loading state
    //   this.chartVisibility = false; // This will trigger the loading state
    //   }, 3000);

  }



  chartData: any = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          labels: [],
          data: [],
          backgroundColor: [],
          borderWidth: 0,  // Set borderWidth to 0 to remove the white line
          hoverOffset: 0,
        },
      ],
    },
  };

  chartData2: any = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
        labels: [],
        data: [],
        backgroundColor: environment.ABLFUND_COLOR_CODE,
        borderWidth: 0,  // Set borderWidth to 0 to remove the white line
        hoverOffset: 10,
        },
      ],
    },
  };


  

  PortfolioSummary() {
    const userid = this.stateService.getUserId();
    const folionumber = this.stateService.getAccountNumber();
    const portfolioSummaryPayload = { userid, folionumber };
    // console.log('Data being posted:', portfolioSummaryPayload, globalAuthToken);

    this.apiService.GetPortfolioSummary(portfolioSummaryPayload).subscribe(
      (response: any) => {
        console.log('GetPortfolioSummary Response:', response);
        if (response) {
          this.totalBalanceAmount = response.totalBalanceAmount;
          this.cisInvestmentValue = response.totalBalanceAmount;                   
          this.asOnDate = response.asOnDate;
          setTimeout(() => {
            Swal.close();
          }, 1000);
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
  


  cnicPortfolioDetail() { 
    const folionumber = this.stateService.getAccountNumber();
    const portfolioSummaryPayload = { folionumber };    

    this.apiService.GetCnicPortfolioDetail(portfolioSummaryPayload).subscribe(
      (response: any) => {
        console.log('GetCnicPortfolioDetail Response:', response);
        if (response) { 
          
          // Initialize formattedData array if it doesn't exist
          this.chartData.data.datasets[0].formattedData = [];

          // Loop through each allocation to format the amounts
          response.cisPortfolioSummary.cisPortfolioSummary.forEach((allocation: any) => {
            // Add the fundCategoryCode to the labels for the chart
            this.chartData.data.labels.push(allocation.fundCategoryCode);
            
            // Store the raw amount and formatted amount separately
            const rawAmount = allocation.amount;  // Raw value (no formatting)

            const formattedAmount = this.formatNumberWithSeparator(rawAmount);  // Formatted value
            // Push the raw value into the datasets
            this.chartData.data.datasets[0].data.push(rawAmount);
            
            // Push the formatted amount into formattedData
            this.chartData.data.datasets[0].formattedData.push(formattedAmount);
            // You can also log the raw and formatted amounts
            // console.log(`Raw: ${rawAmount}, Formatted: ${formattedAmount}`);

            // Add the background color
            this.chartData.data.datasets[0].backgroundColor.push(allocation.fundCategoryColorCode);
          });
          
          // Update the chart
          this.chart1.updateChart();
          
          // Close the Swal after some delay
          setTimeout(() => {
            Swal.close();
          }, 9000);
        } 
        else if (response == null) {
          this.transactionDetail = [];
          setTimeout(() => {
            Swal.close();
          }, 1000);
        }
        else {
          this.loadingAlert('No Response', 'The server did not return any response.');
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.statusText);
      });
}





  
  portfolioAllocationDetail() {
    const userid = this.stateService.getUserId();
    const folionumber = this.stateService.getAccountNumber();
    const portfolioSummaryPayload = { userid, folionumber };    

    this.apiService.GetPortfolioAllocationDetail(portfolioSummaryPayload).subscribe(
      (response: any) => {
        console.log('GetPortfolioAllocationDetail Response:', response);
        if (response) {          
          response.portfolioAllocation.forEach((allocation: any) => {
            this.chartData2.data.labels.push(allocation.fundShortName + ' - '+ allocation.navDate);
            this.chartData2.data.datasets[0].data.push(allocation.availableAmount);
            this.chartData2.data.datasets[0].labels.push(allocation.fundName);
          });

          // Update the second chart
          this.chart2.updateChart();
          
          setTimeout(() => {
          Swal.close();
          }, 9000);
        }
        else if (response == null) {
          this.transactionDetail = [];
          setTimeout(() => {
            Swal.close();
          }, 1000);
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
    


  getTransactionDetail(transexecuted: string) {
    this.isButtonDisabled = !this.isButtonDisabled;  // Toggle the boolean value
    this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert

    const userid = this.stateService.getUserId();
    const folionumber = this.stateService.getAccountNumber();
    const portfolioSummaryPayload = { userid, folionumber, transexecuted };    
    // console.log('Data being posted:', portfolioSummaryPayload, globalAuthToken);
    
    this.apiService.GetTransactionDetail(portfolioSummaryPayload).subscribe(
      (response: any) => {
        console.log('GetTransactionDetail Response:', response);
        if (response) {
          this.transactionDetail = [];
          
            // this.transactionDetail = [
            // { transDate: '2024-01-01', fundName: 'Fund A', transType: 'FTF', units: 100, amount: 500 },
            // { transDate: '2024-02-01', fundName: 'Fund B', transType: 'null', units: 200, amount: 1000 },
            // { transDate: '2024-03-01', fundName: 'Fund C', transType: 'FTF', units: 150, amount: 750 },
            // ];

          response.transList.forEach((allocation: any) => {
            if (!allocation.transDate) allocation.transDate = 'null';
            if (!allocation.fundName) allocation.fundName = 'null';
            if (!allocation.transType) allocation.transType = 'null';
            if (!allocation.units) allocation.units = 'null';
            if (!allocation.amount) allocation.amount = 'null';
            if (!allocation.TO_FOLIO_NUM) allocation.TO_FOLIO_NUM || 'null';
            if (!allocation.TO_FUND_CODE) allocation.TO_FUND_CODE || 'null';

            if (allocation.transDate !== 'null') {
              allocation.transDate = this.DateFormator(allocation.transDate);
            }

            this.transactionDetail.push(allocation);
          });
            
          setTimeout(() => {
            Swal.close();
          }, 1000);
        }
        else if (response == null) {
          this.transactionDetail = [];
          setTimeout(() => {
            Swal.close();
          }, 1000);
        }
        else {
          this.loadingAlert('No Response', 'The server did not return any response.');
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.statusText);
      });
  }



  sortData(key: string) {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle order
    } else {
      this.sortKey = key;
      this.sortOrder = 'asc'; // Default to ascending
    }

    this.transactionDetail.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }


  DateFormator(dateString: string): Date {
    const parts = dateString.split('/');
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);  // Convert to a Date object
  }


  // Function to format numbers with a thousand separator
  formatNumberWithSeparator(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
}



  toggleButtonState(buttonType: string) {
    if (buttonType === 'EXECUTED') {
      this.getTransactionDetail('EXECUTED');
      this.isExecutedActive = true;  // Mark Executed as active
      this.isInProcessActive = false;  // Mark In-Process as inactive
    } else if (buttonType === 'INPROCESS') {
      this.getTransactionDetail('INPROCESS');
      this.isInProcessActive = true;  // Mark In-Process as active
      this.isExecutedActive = false;  // Mark Executed as inactive
    }
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

  
  showErrorAlert(errorTittle:string) {
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: errorTittle,
    });
  }


}
