import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = '/corporateservices'; // Use the relative path for the API URL


  constructor(private http: HttpClient) { }


  generateTokenPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generateConsumerToken`, data);
  }


  
  AuthenticateUser(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/AuthenticateUser`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('userpwd', data.userpwd);
    return this.http.post<any>(completeUrl, null, { params });
  }


  AuthenticateAdmin(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/LoginAdmin`;
    return this.http.post<any>(completeUrl, data);
  }

  
  GetAddedUsers(): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/GetAddedUsers`;
    return this.http.get<any>(completeUrl);
  }

  


  Signup(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/generateOTP`;
    return this.http.post<any>(completeUrl, data);
  }


  VerifyOtpAndRegisterUser(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/verifyotpandregistercorpuser`;
    return this.http.post<any>(completeUrl, data);
  }



  GetPortfolioSummary(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/GetPortfolioSummary`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('folionumber', data.folionumber);
    return this.http.post<any>(completeUrl, null, { params });
  }


  GetCnicPortfolioDetail(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/cnicPortfolioDetail`;
    let params = new HttpParams()
      .set('folioNumber', data.folionumber);
    return this.http.post<any>(completeUrl, null, { params });
  }



  GetPortfolioAllocationDetail(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/GetPortfolioAllocationDetail`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('folionumber', data.folionumber);
    return this.http.post<any>(completeUrl, null, { params });
  }


  GetTransactionDetail(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/GetTransactionDetail`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('folionumber', data.folionumber)
        .set('transexecuted', data.transexecuted);
    return this.http.post<any>(completeUrl, null, { params });
  }

  

  GetFundsNames(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/getfundsname`;
    let params = new HttpParams()
        .set('folio', data.folionumber);
    return this.http.get<any>(completeUrl, { params });
  }



  GenerateReport(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/generateReport`;
    // let params = new HttpParams()
    //   .set('planId', data.planId)
    //   .set('fromDate', data.fromDate)
    //   .set('toDate', data.toDate)
    //   .set('folioNumber', data.folionumber)
    //   .set('fundCode', data.fundCode)
    //   .set('reportName', data.reportName)
    //   .set('reportType', data.reportType)
    //   .set('sessionId', data.sessionId)
    //   .set('userId', data.userid);
    // return this.http.post<any>(completeUrl, data, {  });
    return this.http.post<any>(completeUrl, data);  // Directly pass 'data' as the payload

  }


  ChangePassword(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/ChangePassword`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('oldpwd', data.oldpwd)
        .set('newpwd', data.newpwd);
    return this.http.post<any>(completeUrl, null, { params });
  }


  GetUserByFolio(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/getuserbyfolio`;
    let params = new HttpParams()
        .set('folio', data.folio);
    return this.http.get<any>(completeUrl, { params });
  }


  UpdateUser(data: any): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/registercorpuser`;
    return this.http.post<any>(completeUrl, data);
  }




}
