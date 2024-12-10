import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) {}

  private globalAuthTokenSubject = new BehaviorSubject<string>(sessionStorage.getItem('globalAuthToken') || '');
  globalAuthToken$ = this.globalAuthTokenSubject.asObservable();

  setGlobalAuthToken(token: string) {
    this.globalAuthTokenSubject.next(token);
    sessionStorage.setItem('globalAuthToken', token);
  }

  getGlobalAuthToken() {
    return sessionStorage.getItem('globalAuthToken') || '';
  }




  private accountTitleSubject = new BehaviorSubject<string>('');
  accountTitle$ = this.accountTitleSubject.asObservable();

  setAccountTitle(title: string) {
    this.accountTitleSubject.next(title);
    sessionStorage.setItem('accountTitle', title);
  }

  getAccountTitle() {
    return sessionStorage.getItem('accountTitle') || '';
  }


  


  private accountNumberSubject = new BehaviorSubject<string>('');
  accountNumber$ = this.accountNumberSubject.asObservable();

  setAccountNumber(accountNumber: string) {
    this.accountNumberSubject.next(accountNumber);
    sessionStorage.setItem('accountNumber', accountNumber);
  }

  getAccountNumber() {
    return sessionStorage.getItem('accountNumber') || '';
  }





  private userIdSubject = new BehaviorSubject<string>('');
  userId$ = this.userIdSubject.asObservable();

  setUserId(userId: string) {
    this.userIdSubject.next(userId);
    sessionStorage.setItem('userId', userId);
  }

  getUserId() {
    return sessionStorage.getItem('userId') || '';
  }



}
