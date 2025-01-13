import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = '/corporateservices'; // Use the relative path for the API URL


  constructor(private http: HttpClient) { }


  consumerTokenPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generateConsumerToken`, data);
  }


  
  AuthenticateUser(data: any, headers: HttpHeaders): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/AuthenticateUser`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('userpwd', data.userpwd);
    return this.http.post<any>(completeUrl, null, { headers, params });
  }


  AuthenticateAdmin(data: any, headers: HttpHeaders): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/user/AuthenticateUser`;
    let params = new HttpParams()
        .set('adminid', data.userid)
        .set('adminpwd', data.userpwd);
    return this.http.post<any>(completeUrl, null, { headers, params });
  }



  GetPortfolioSummary(data: any, headers: HttpHeaders): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/GetPortfolioSummary`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('folionumber', data.folionumber);
    return this.http.post<any>(completeUrl, null, { headers, params });
  }


  GetCnicPortfolioDetail(data: any, headers: HttpHeaders): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/cnicPortfolioDetail`;
    let params = new HttpParams()
      .set('folioNumber', data.folionumber);
    return this.http.post<any>(completeUrl, null, { headers, params });
  }



  GetPortfolioAllocationDetail(data: any, headers: HttpHeaders): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/GetPortfolioAllocationDetail`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('folionumber', data.folionumber);
    return this.http.post<any>(completeUrl, null, { headers, params });
  }


  GetTransactionDetail(data: any, headers: HttpHeaders): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/GetTransactionDetail`;
    let params = new HttpParams()
        .set('userid', data.userid)
        .set('folionumber', data.folionumber)
        .set('transexecuted', data.transexecuted);
    return this.http.post<any>(completeUrl, null, { headers, params });
  }

  

  GetFundsNames(data: any, headers: HttpHeaders): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/getfundsname`;
    let params = new HttpParams()
        .set('folio', data.folionumber);
    return this.http.get<any>(completeUrl, { headers, params });
  }



  GenerateReport(data: any, headers: HttpHeaders): Observable<any> {
    const completeUrl = `${this.baseUrl}/api/account/generateReport`;
    let params = new HttpParams()
      .set('planId', data.planId)
      .set('fromDate', data.fromDate)
      .set('toDate', data.toDate)
      .set('folioNumber', data.folionumber)
      .set('fundCode', data.fundCode)
      .set('reportName', data.reportName)
      .set('reportType', data.reportType)
      .set('sessionId', data.sessionId)
      .set('userId', data.userid);
    return this.http.post<any>(completeUrl, data, { headers });
    // return this.http.post<any>(completeUrl, data);  // Directly pass 'data' as the payload

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
