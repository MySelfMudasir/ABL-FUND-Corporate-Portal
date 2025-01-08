import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.checkAuthToken();
  }

  private checkAuthToken(): void {
    const token = sessionStorage.getItem('globalAuthToken');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(token: string): void {
    sessionStorage.setItem('globalAuthToken', token);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('globalAuthToken');
    sessionStorage.removeItem('accountTitle'); 
    sessionStorage.removeItem('accountNumber');
    sessionStorage.removeItem('userId');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']); // Redirect to home
  }


}
