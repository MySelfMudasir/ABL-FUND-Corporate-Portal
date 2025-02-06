import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { MainModule } from '../main/main.module';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolioAllocationDetails',
  standalone: true,
  imports: [
    MainModule,
    CommonModule
  ],
  templateUrl: './portfolioAllocationDetails.component.html',
  styleUrl: './portfolioAllocationDetails.component.css'
})
export class PortfolioAllocationDetailsComponent implements OnInit {
  totalBalanceAmount: number = 0;
  portfolioAllocation: any[] = [];
  originalPortfolioAllocation: any[] = [];
  sortKey = ''; // Default sorting key
  sortOrder = 'asc'; // Default ascending order

  // Sample fund list
  fundList: string[] = [];

  // Filtered portfolio data (initially all data)
  filteredPortfolio = [...this.portfolioAllocation];

  // Unique fund names for dropdown (will be calculated dynamically)
  uniqueFunds: string[] = [];



  constructor(private apiService: ApiService, private stateService: StateService, private router: Router) {}

  ngOnInit() {
    this.loadingAlert('Processing your request...', 'Loading...'); // Pass a message to the loading alert
    this.portfolioAllocationDetail();
  }




  portfolioAllocationDetail() {
    const userid = this.stateService.getUserId();
    const folionumber = this.stateService.getAccountNumber();
    const portfolioSummaryPayload = { userid, folionumber };

    this.apiService.GetPortfolioAllocationDetail(portfolioSummaryPayload).subscribe(
      (response: any) => {
        console.log('GetPortfolioSummary Response:', response);
        if (response) {
          console.log(response);
          setTimeout(() => {
            this.totalBalanceAmount = (response.totalBalanceAmount);
            this.portfolioAllocation = response.portfolioAllocation;
            this.originalPortfolioAllocation = response.portfolioAllocation;
            this.fundList = [...new Set(this.portfolioAllocation.map(item => item.fundName))]; // Get unique
            Swal.close();
          }, 1000);
        }
        else{
          this.portfolioAllocation = [];
          this.totalBalanceAmount = 0.00;
          this.loadingAlert('No Response', 'The server did not return any response.');
        }
      },
      (error: any) => {
        console.error('Error posting data', error);
        this.showErrorAlert(error.statusText);
      });
  }


  // Update the list of unique fund names
  updateUniqueFunds(): void {
    const fundNames = this.portfolioAllocation.map(item => item.fundName);
    this.uniqueFunds = [...new Set(fundNames)];
  }

  // Method to set the filter
  setFilter(fund: string): void {
    console.log('Selected fund:', fund);
    
    if (fund === 'All') {
      this.portfolioAllocation = this.originalPortfolioAllocation;
    } else {
      this.portfolioAllocation = [...this.originalPortfolioAllocation]; // Reload the original data if the search term is empty
      this.portfolioAllocation = this.portfolioAllocation.filter(allocation => 
        allocation.fundName.includes(fund)
      );
    }
  }
  



  sortData(key: string, type: 'number' | 'string' | 'date') {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle order
    } else {
      this.sortKey = key;
      this.sortOrder = 'asc'; // Default to ascending
    }

    this.portfolioAllocation.sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (type === 'number') {
        valueA = parseFloat(valueA);
        valueB = parseFloat(valueB);
      } else if (type === 'date') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      } else if (type === 'string') {
        valueA = valueA.toString().toLowerCase();
        valueB = valueB.toString().toLowerCase();
      }

      if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }


  filterPortfolio(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.portfolioAllocation = [...this.originalPortfolioAllocation]; // Reload the original data if the search term is empty
    this.portfolioAllocation = this.portfolioAllocation.filter(allocation => 
      allocation.fundName.toLowerCase().includes(searchTerm)
    );
    if(searchTerm === ''){
      this.portfolioAllocation = this.originalPortfolioAllocation;
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
      allowEnterKey: false
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
