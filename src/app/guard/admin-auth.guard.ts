import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('globalAuthToken');
    
    if (token) {
      return true;  // Allow access if token is present
    } else {
      this.router.navigate(['/admin-login']);  // Redirect to admin login page if no token
      return false;  // Prevent access
    }
  }
}
