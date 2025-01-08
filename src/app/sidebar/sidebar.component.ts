import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

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
    this.authService.logout();
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