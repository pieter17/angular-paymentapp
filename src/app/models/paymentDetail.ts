export interface PaymentDetail {
  paymentDetailId?: number;
  cardOwnerName: string;
  cardNumber: string;
  expirationDate: Date;
  securityCode: string;
}
