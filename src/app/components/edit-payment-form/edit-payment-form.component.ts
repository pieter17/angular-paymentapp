import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { PaymentDetail } from './../../models/paymentDetail';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-payment-form',
  templateUrl: './edit-payment-form.component.html',
  styleUrls: ['./edit-payment-form.component.css'],
})
export class EditPaymentFormComponent implements OnInit {
  @Input() payment: PaymentDetail = {} as PaymentDetail;
  @Output() putPaymentEvent = new EventEmitter<boolean>();
  pay: PaymentDetail = {} as PaymentDetail;

  constructor(private paymentDetailService: PaymentDetailService) {}

  editForm = new FormGroup({
    paymentDetailId: new FormControl('', [Validators.required]),
    cardOwnerName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
    ]),
    month: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    year: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get paymentDetailId() {
    return this.editForm.get('paymentDetailId');
  }

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    this.pay = changes.payment.currentValue;
    this.updateForm();
  }

  updateForm() {
    const eDate = new Date(this.pay.expirationDate);
    const month = eDate.getMonth() + 1;
    const year = eDate.getUTCFullYear();
    this.editForm.patchValue({
      paymentDetailId: this.pay.paymentDetailId,
      cardOwnerName: this.pay.cardOwnerName,
      cardNumber: this.pay.cardNumber,
      month: `${month}`,
      year: `${year - 2000}`,
    });
    this.paymentDetailId?.disable();
  }

  get cardOwnerName() {
    return this.editForm.get('cardOwnerName');
  }

  get cardNumber() {
    return this.editForm.get('cardNumber');
  }

  get month() {
    return this.editForm.get('month');
  }

  get year() {
    return this.editForm.get('year');
  }

  putPayment() {
    let editPayment: PaymentDetail = {
      paymentDetailId: this.pay.paymentDetailId,
      cardOwnerName: this.cardOwnerName?.value,
      cardNumber: this.cardNumber?.value,
      expirationDate: new Date(
        2000 + Number(this.year?.value),
        Number(this.month?.value) - 1
      ),
      securityCode: this.pay.securityCode,
    };
    this.paymentDetailService.putPaymentDetail(editPayment).subscribe(
      (res) => {
        let ref = document.getElementById('cancelbtn');
        ref?.click();
        this.editForm.reset();
        this.putPaymentEvent.emit(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
