import { PaymentDetail } from './../../models/paymentDetail';
import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  paymentDetails: PaymentDetail[] = [];
  currPayment: PaymentDetail = {} as PaymentDetail;

  constructor(
    private paymentDetailService: PaymentDetailService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments() {
    this.paymentDetailService.getAllPaymentDetails().subscribe(
      (res) => {
        if (res) this.paymentDetails = res;
      },
      (err) => {
        alert(err);
        this.router.navigate(['/login']);
      }
    );
  }

  newItemTrigger(res: PaymentDetail) {
    this.getAllPayments();
    this.toastr.success('Added Succsessfully');
  }

  getPaymentById(id: number) {
    return this.paymentDetailService.getPaymentDetailById(id).subscribe(
      (res) => {
        this.currPayment = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deletePayment(id: number) {
    if (confirm('Are You Sure Want To Delete Payment id: ' + id)) {
      this.paymentDetailService.deletePaymentDetail(id).subscribe(
        (res) => {
          alert(`Payment ${id} Deleted Successfully`);
          this.getAllPayments();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
