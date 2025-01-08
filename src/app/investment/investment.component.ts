import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MainModule } from "../main/main.module";
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from "../date-picker/date-picker.component";

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [
    MainModule,
    SidebarComponent,
    CommonModule,
    DatePickerComponent
],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent {

}
