import { PaymentDetail } from './../../models/paymentDetail';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-payment-form',
  templateUrl: './add-payment-form.component.html',
  styleUrls: ['./add-payment-form.component.css'],
})
export class AddPaymentFormComponent implements OnInit {
  @Output() newPayment = new EventEmitter<PaymentDetail>();

  formAdd = new FormGroup({
    cardOwnerName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.pattern('^[0-9]*$'),
    ]),
    month: new FormControl('', [
      Validators.required,
      Validators.maxLength(2),
      Validators.min(1),
      Validators.max(12),
      Validators.pattern('^[0-9]*$'),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[0-9]*$'),
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  get form() {
    return this.formAdd.controls;
  }

  get cardOwnerName() {
    return this.formAdd.get('cardOwnerName');
  }

  get cardNumber() {
    return this.formAdd.get('cardNumber');
  }

  get month() {
    return this.formAdd.get('month');
  }

  get year() {
    return this.formAdd.get('year');
  }

  get securityCode() {
    return this.formAdd.get('securityCode');
  }

  constructor(private paymentService: PaymentDetailService) {}

  ngOnInit(): void {}

  add() {
    let newPayment: PaymentDetail = {
      cardOwnerName: this.cardOwnerName?.value,
      cardNumber: this.cardNumber?.value,
      expirationDate: new Date(
        2000 + Number(this.year?.value),
        Number(this.month?.value)
      ),
      securityCode: this.securityCode?.value,
    };
    this.paymentService.postPaymentDetail(newPayment).subscribe(
      (res) => {
        this.newPayment.emit(res);
        this.formAdd.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
