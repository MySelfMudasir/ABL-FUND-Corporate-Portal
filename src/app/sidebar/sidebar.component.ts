import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isSidebarVisible: boolean = false;
  xtoggle:boolean = false;
  isCollapsed = false;


  constructor(private router: Router, private authService: AuthService) {}

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.xtoggle = !this.xtoggle;
  }

  toggleChevron() {
    this.isCollapsed = !this.isCollapsed;
  }


  logout() {
    this.closeModal();
    const currentRoute = this.router.url;
    this.authService.logout(currentRoute);
  }

  openModal(): void {
    const modalButton = document.querySelector('button[data-bs-target="#modalCenter"]') as HTMLElement;
      modalButton.click();
  }

  closeModal() {
    const modalButton = document.querySelector('button[data-bs-target="#modalCenter"]') as HTMLElement;
      modalButton.click();
  }


}
