import { PaymentDetail } from './../../models/paymentDetail';
import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
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

  updatePaymentTrigger() {
    this.getAllPayments();
    this.toastr.warning('Update Successfully');
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
    this.spinner.show();
    if (confirm('Are You Sure Want To Delete Payment id: ' + id)) {
      this.paymentDetailService.deletePaymentDetail(id).subscribe(
        (res) => {
          this.spinner.hide();
          alert(`Payment ${id} Deleted Successfully`);
          this.getAllPayments();
          this.toastr.error(`Id ${id} deleted successfully`);
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
        }
      );
    }
  }
}
