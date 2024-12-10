import { Component } from '@angular/core';
import { MainModule } from '../main/main.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainModule,   
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  // chartData: any = {
  //   type: 'pie',
  //   data: {
  //     datasets: [
  //       {
  //         labels: [
  //           'Shariah Compliant Equity Funds',
  //           'Shariah Compliant Money Market Funds',
  //         ],
  //         data: [79.46, 20.54],
  //         backgroundColor: ['#FFB84D', '#1C4E80'],
  //         borderColor: '#fff', 
  //         borderWidth: 0,  // Set borderWidth to 0 to remove the white line
  //         hoverOffset: 10,
  //       },
  //     ],
  //   },
  // };



  // chartData2: any = {
  //   type: 'pie',
  //   data: {
  //     datasets: [
  //       {
  //         labels: [
  //           'Shariah Compliant Equity Funds',
  //           'Shariah Compliant Money Market Funds',
  //         ],
  //         data: [100],
  //         backgroundColor: ['#D3D3D3'],
  //         borderWidth: 0,  // Set borderWidth to 0 to remove the white line
  //         hoverOffset: 10,
  //       },
  //     ],
  //   },
  // };


 
  



  
}
