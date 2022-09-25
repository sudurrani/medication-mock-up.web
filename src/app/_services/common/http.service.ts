import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  //baseUrl: string = 'https://arplace.eu/web-services/api/';
  //baseUrl: string = 'http://localhost:5048/api/';
  baseUrl: string = environment.apiEndpoint;

  
  
  /**
   *
   */

  constructor(    
    private httpClient: HttpClient,
    private _router: Router
  ) {
  }
  get(url: string): Observable<any> {    
    url = this.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') + ''
        })
    };
    // var response = this.httpClient.get<any>(url, httpOptions)        
    // return response;
    return this.httpClient.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }
  post(url: string, inputJSON: any, isJSONContentType: boolean = true): Observable<any> {    
    url = this.baseUrl + url;
    var httpOptions: any;
    if (isJSONContentType) {
      httpOptions = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            //'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token') + ''
          })

      };
    }
    else {

      httpOptions = {
        headers: new HttpHeaders(
          {
            //'Content-Type': 'application/json',
            //'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token') + ''
          })

      };
    }    
    //var response = this.httpClient.post<any>(url, inputJSON, httpOptions)
    //return response;
     return this.httpClient.post<any>(url, inputJSON, httpOptions)
     .pipe(
         catchError(this.handleError<any[]>('', []))
     );
  }
  /**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error.status); // log to console instead
      if (error.status == 401) {
        this._router.navigate(['/user-login']);
      }
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
