import { User } from '../models/user';

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://paymentapifinal.herokuapp.com/api/AuthManagement';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  refreshToken() {
    const token = this.getAuthorizationToken();
    const refreshToken = this.getRefreshToken();

    return this.http
      .post(`${this.endpoint}/refreshtoken`, { token, refreshToken })
      .pipe(catchError(this.handleError));
  }

  getAuthorizationToken() {
    return localStorage.getItem('app_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  setAuthorizationToken(token: string, refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
    return localStorage.setItem('app_token', token);
  }

  register(user: User): Observable<any> {
    return this.http
      .post(`${this.endpoint}/Register`, user)
      .pipe(catchError(this.handleError));
  }

  login(user: User): Observable<any> {
    return this.http
      .post(`${this.endpoint}/login`, user)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errors: any = [];

    errors = error.error.errors
      ? error.error.errors
      : `Error Code: ${error.status}\nMessage: ${error.message}`;

    return throwError(errors);
  }
}
