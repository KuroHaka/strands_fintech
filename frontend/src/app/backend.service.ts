import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl : string = "http://localhost:8000/";

  private httpWithoutInterceptor: HttpClient;

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    httpBackend.handle    
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
  
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.backendUrl + `${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    return this.http.post(
      this.backendUrl + `${path}`,
      body,
      options
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      this.backendUrl + `${path}`
    ).pipe(catchError(this.formatErrors));
  }

  _get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpWithoutInterceptor.get(`${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  _put(path: string, body: Object = {}): Observable<any> {
    return this.httpWithoutInterceptor.put(
      `${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  _post(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    return this.httpWithoutInterceptor.post(
      `${path}`,
      JSON.stringify(body),
      options
    ).pipe(catchError(this.formatErrors));
  }

  _delete(path: string): Observable<any> {
    return this.httpWithoutInterceptor.delete(
      `${path}`
    ).pipe(catchError(this.formatErrors));
  }
}