import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';  // Import standalone component
import { Header2Component } from '../header2/header2.component';  // Import standalone component
import { FooterComponent } from '../footer/footer.component';  // Import standalone component
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { SidebarComponent } from '../sidebar/sidebar.component';  // Import standalone component
import { ChartComponent } from '../chart/chart.component';  // Import standalone component
import { RouterLink } from '@angular/router';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { Footer2Component } from '../footer2/footer2.component';

@NgModule({
  imports: [
    // Import standalone components here
    HeaderComponent,
    Header2Component,
    FooterComponent,
    Footer2Component,
    DatePickerComponent,
    SidebarComponent,
    ChartComponent,
    RouterLink,
    TooltipComponent,
  ],
  exports: [
    // Export standalone components here
    HeaderComponent,
    Header2Component,
    FooterComponent,
    Footer2Component,
    DatePickerComponent,
    SidebarComponent,
    ChartComponent,
    RouterLink,
    TooltipComponent,
  ]
})
export class MainModule {}
