import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorHandler } from '../helpers/errorHandler';
import { PaymentDetail } from '../models/paymentDetail';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  endpoint: string = `https://paymentapifinal.herokuapp.com/api/paymentdetail`;

  constructor(private http: HttpClient) {}

  getAllPaymentDetails(): Observable<any> {
    return this.http.get(this.endpoint).pipe(catchError(errorHandler));
  }

  getPaymentDetailById(id: number): Observable<any> {
    return this.http
      .get(`${this.endpoint}/${id}`)
      .pipe(catchError(errorHandler));
  }

  postPaymentDetail(payment: PaymentDetail): Observable<any> {
    return this.http
      .post(this.endpoint, payment)
      .pipe(catchError(errorHandler));
  }

  putPaymentDetail(payment: PaymentDetail): Observable<any> {
    const { paymentDetailId } = payment;
    return this.http
      .put(`${this.endpoint}/${paymentDetailId}`, payment)
      .pipe(catchError(errorHandler));
  }

  deletePaymentDetail(id: number): Observable<any> {
    return this.http
      .delete(`${this.endpoint}/${id}`)
      .pipe(catchError(errorHandler));
  }
}
