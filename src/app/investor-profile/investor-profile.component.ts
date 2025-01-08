import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MainModule } from "../main/main.module";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investor-profile',
  standalone: true,
  imports: [
    MainModule,
    SidebarComponent,
    CommonModule
  ],
  templateUrl: './investor-profile.component.html',
  styleUrl: './investor-profile.component.css'
})
export class InvestorProfileComponent {

  isIconPlus: boolean = false;

  onChangeIcon() {
    this.isIconPlus = !this.isIconPlus;
  }


  

}
