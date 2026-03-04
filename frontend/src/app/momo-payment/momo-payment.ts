import { Component } from '@angular/core';
import { MomoService, MomoPaymentRequest } from '../myservices/momo-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-momo-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './momo-payment.html',
  styleUrls: ['./momo-payment.css'],
})
export class MomoPayment {
  amount: number | null = 50000;
  orderInfo: string = 'Thanh toan don hang MoMo Test';
  loading: boolean = false;
  errMessage: string = '';
  successMessage: string = '';

  constructor(private _momoService: MomoService) {}

  generateOrderId(): string {
    return 'ORDER' + new Date().getTime();
  }

  onPayment() {
    if (!this.amount || this.amount < 1000) {
      this.errMessage = 'Số tiền phải ít nhất 1,000 VNĐ';
      return;
    }
    this.errMessage = '';
    this.successMessage = '';
    this.loading = true;

    const payload: MomoPaymentRequest = {
      amount: this.amount,
      orderInfo: this.orderInfo,
      orderId: this.generateOrderId(),
    };

    this._momoService.createPayment(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.resultCode === 0 && res.payUrl) {
          this.successMessage = 'Đang chuyển hướng sang MoMo...';
          // Redirect sang trang thanh toán MoMo sandbox
          window.location.href = res.payUrl;
        } else {
          this.errMessage = `Lỗi MoMo [${res.resultCode}]: ${res.message}`;
        }
      },
      error: (err) => {
        this.loading = false;
        this.errMessage = 'Không thể kết nối server: ' + err.message;
      },
    });
  }
}