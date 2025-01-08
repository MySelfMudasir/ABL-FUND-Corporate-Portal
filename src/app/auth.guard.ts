import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('globalAuthToken');
    const userId = sessionStorage.getItem('userId');
    const accountTitle = sessionStorage.getItem('accountTitle');
    const accountNumber = sessionStorage.getItem('accountNumber');
    if (token && userId && accountTitle && accountNumber) {
      return true; // Prevent navigation to root
    } else {
      this.router.navigate(['/']); // Redirect to home
      return false; // Prevent navigation
    }
  }


}
