import { Component, OnInit } from '@angular/core';
import {
  PaddleProductPrice,
  PaddleService,
  PaddleEventCallbackData,
  PADDLE_EVENT_TYPE,
} from 'paddle'; // yours should be: 'ngx-paddle-wrapper' instead of 'paddle'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngx-paddle-wrapper';
  price: PaddleProductPrice;
  // TYPE YOUR OWN IDs BELOW:
  vendorId = 123456;
  productId = 654321;

  constructor(private paddleServ: PaddleService) {}

  async ngOnInit(): Promise<void> {
    await this.paddleServ.create({
      vendor: this.vendorId,
      eventCallback: (data: PaddleEventCallbackData) => {
        this.checkEvent(data);
      },
    });
    this.price = await this.paddleServ.getPrice(this.productId);
  }

  onSubscribe() {
    this.paddleServ.open({
      product: this.productId,
    });
  }

  checkEvent(data: PaddleEventCallbackData) {
    // Handle Event
    if (data.event === PADDLE_EVENT_TYPE.CheckoutComplete) {
      console.log('User has completed checkout!');
    } else {
      console.log(data.event);
    }
  }
}
